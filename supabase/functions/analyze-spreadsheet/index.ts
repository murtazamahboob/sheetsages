import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface AnalysisRequest {
  fileContent: string;
  fileName: string;
  fileSize: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    // Get user from authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("Invalid authentication token");
    }

    // Check if user can analyze
    const { data: canAnalyze } = await supabase.rpc("can_user_analyze", { p_user_id: user.id });
    if (!canAnalyze) {
      return new Response(
        JSON.stringify({ error: "Monthly analysis limit reached. Please upgrade your plan." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { fileContent, fileName, fileSize }: AnalysisRequest = await req.json();

    if (!fileContent) {
      throw new Error("No file content provided");
    }

    // Parse CSV content to get preview
    const lines = fileContent.split("\n").slice(0, 100); // First 100 rows for analysis
    const dataPreview = lines.join("\n");

    // Call Groq API for analysis
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are an expert data analyst. Analyze the provided spreadsheet data and return a JSON response with the following structure:
{
  "summary": {
    "totalRows": number,
    "totalColumns": number,
    "dataQuality": "Excellent" | "Good" | "Fair" | "Poor",
    "keyMetrics": [{ "label": string, "value": string }]
  },
  "insights": [
    { "type": "trend" | "risk" | "opportunity", "title": string, "description": string, "impact": "high" | "medium" | "low" }
  ],
  "recommendations": [
    { "priority": 1-5, "action": string, "rationale": string, "expectedOutcome": string }
  ]
}

Be precise, actionable, and focus on business value. Identify patterns, risks, and opportunities in the data.`
          },
          {
            role: "user",
            content: `Analyze this spreadsheet data from file "${fileName}":\n\n${dataPreview}`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      }),
    });

    if (!groqResponse.ok) {
      const error = await groqResponse.text();
      console.error("Groq API error:", error);
      throw new Error("Failed to analyze spreadsheet with AI");
    }

    const groqData = await groqResponse.json();
    const analysisResult = JSON.parse(groqData.choices[0].message.content);

    // Increment user's analysis count
    await supabase.rpc("increment_analysis_count", { p_user_id: user.id });

    // Save analysis to history
    await supabase.from("analysis_history").insert({
      user_id: user.id,
      file_name: fileName,
      file_size: fileSize,
      analysis_summary: analysisResult.summary,
      insights: analysisResult.insights,
      recommendations: analysisResult.recommendations,
    });

    return new Response(
      JSON.stringify(analysisResult),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in analyze-spreadsheet:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
