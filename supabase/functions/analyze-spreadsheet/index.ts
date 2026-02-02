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
  userGoal?: string;
}

const DATA_SCIENTIST_PROMPT = `You are a Senior Data Scientist AI Agent designed to transform raw Excel datasets into complete, actionable data science solutions.
You operate like a professional data scientist working in industry, handling end-to-end data analysis, modeling evaluation, and recommendations without user intervention.

CRITICAL RULES:
- Never hallucinate results. Only report what you can verify from the data.
- Be precise with numbers and statistics.
- If data is ambiguous, note the limitation rather than guessing.
- Always provide actionable, business-focused recommendations.

ANALYSIS WORKFLOW:

1. DATASET UNDERSTANDING
- Detect column types (numerical, categorical, datetime, text)
- Identify potential target variables (if supervised learning is applicable)
- Detect missing values, outliers, duplicates
- Identify data imbalance and data leakage risks

2. DATA HEALTH ASSESSMENT
- Calculate data quality score
- Identify cleaning requirements
- Recommend encoding strategies
- Suggest scaling methods

3. EXPLORATORY DATA ANALYSIS
- Statistical summaries
- Correlation analysis
- Feature importance indicators
- Trends, patterns, anomalies

4. ML MODEL RECOMMENDATIONS
Based on the dataset, recommend best ML models with justification:
- Regression: Linear Regression, Ridge/Lasso, Random Forest, XGBoost
- Classification: Logistic Regression, Random Forest, XGBoost, LightGBM
- Time Series: ARIMA, SARIMA, Prophet, LSTM
- Clustering: KMeans, DBSCAN, Hierarchical
- Dimensionality Reduction: PCA, UMAP

Explain pros, cons, and expected performance for each recommendation.

5. MODEL EVALUATION GUIDANCE
- Suggest train/validation/test split strategy
- Recommend appropriate metrics
- Provide hyperparameter tuning guidance

6. FINAL INSIGHTS & RECOMMENDATIONS
- Clear conclusion
- Key drivers affecting outcomes
- Business recommendations
- Risks & limitations
- Actionable next steps

Return your analysis as a JSON object with this structure:
{
  "executiveSummary": {
    "headline": "One-sentence summary of the key finding",
    "keyFindings": ["Finding 1", "Finding 2", "Finding 3"],
    "bottomLine": "Business impact summary",
    "confidenceLevel": "high|medium|low"
  },
  "dataHealth": {
    "totalRows": number,
    "totalColumns": number,
    "columnTypes": [{"name": "col", "type": "numerical|categorical|datetime|text|boolean|id", "uniqueValues": number, "nullPercentage": number, "potentialRole": "target|feature|id|datetime|drop"}],
    "missingValues": [{"column": "name", "missingCount": number, "missingPercentage": number, "suggestedStrategy": "mean|median|mode|drop|model-based|forward-fill"}],
    "duplicateRows": number,
    "outlierCount": number,
    "dataQuality": "Excellent|Good|Fair|Poor",
    "dataQualityScore": number,
    "dataLeakageRisk": "None|Low|Medium|High",
    "dataImbalance": {"targetColumn": "name", "imbalanceRatio": number, "minorityClass": "name", "majorityClass": "name", "suggestedTechnique": "SMOTE|undersampling|etc"} or null
  },
  "dataPreparation": {
    "cleaningSteps": [{"step": 1, "action": "description", "reason": "why", "impact": "high|medium|low"}],
    "encodingStrategy": {"categorical": "strategy", "text": "strategy"},
    "scalingMethod": "StandardScaler|MinMaxScaler|RobustScaler|None",
    "featureEngineering": ["suggestion 1", "suggestion 2"]
  },
  "edaInsights": {
    "statisticalSummary": "Brief stats overview",
    "insights": [{"category": "trend|pattern|anomaly|correlation|distribution", "title": "title", "description": "detail", "importance": "high|medium|low", "technicalDetails": "optional"}],
    "topCorrelations": [{"feature1": "name", "feature2": "name", "correlationValue": number, "strength": "strong|moderate|weak", "direction": "positive|negative"}],
    "featureImportance": [{"feature": "name", "importance": number, "reason": "why important"}]
  },
  "mlRecommendations": {
    "inferredGoal": "prediction|classification|clustering|forecasting|insight-generation",
    "targetVariable": "column name or null",
    "recommendedModels": [{
      "modelName": "name",
      "modelType": "regression|classification|clustering|time-series|dimensionality-reduction",
      "suitabilityScore": number,
      "pros": ["pro 1", "pro 2"],
      "cons": ["con 1", "con 2"],
      "expectedPerformance": "description",
      "interpretability": "high|medium|low",
      "trainingComplexity": "low|medium|high",
      "justification": "why this model"
    }],
    "bestModel": "recommended model name",
    "alternativeApproaches": ["approach 1", "approach 2"]
  },
  "modelPerformance": {
    "performanceComparison": [{
      "modelName": "name",
      "metrics": [{"name": "metric", "value": number, "interpretation": "what it means"}],
      "rank": number,
      "isRecommended": boolean,
      "notes": "additional notes"
    }],
    "bestModelDetails": {
      "name": "model name",
      "whyBest": "explanation",
      "keyMetrics": [{"name": "metric", "value": number, "interpretation": "meaning"}]
    }
  },
  "finalInsights": {
    "keyDrivers": ["driver 1", "driver 2"],
    "businessRecommendations": [{"priority": 1, "action": "what to do", "rationale": "why", "expectedOutcome": "result", "effort": "low|medium|high", "impact": "low|medium|high"}],
    "risksAndLimitations": [{"type": "data|model|business|technical", "description": "desc", "severity": "low|medium|high", "mitigation": "how to address"}],
    "nextSteps": [{"priority": 1, "step": "action", "category": "data|feature|model|deployment|monitoring", "effort": "low|medium|high"}]
  }
}`;

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

    const { fileContent, fileName, fileSize, userGoal }: AnalysisRequest = await req.json();

    if (!fileContent) {
      throw new Error("No file content provided");
    }

    // Parse CSV content to get preview (first 150 rows for comprehensive analysis)
    const lines = fileContent.split("\n").slice(0, 150);
    const dataPreview = lines.join("\n");

    // Build user message with optional goal
    let userMessage = `Analyze this spreadsheet data from file "${fileName}":\n\n${dataPreview}`;
    if (userGoal) {
      userMessage = `User goal: ${userGoal}\n\n${userMessage}`;
    }

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
            content: DATA_SCIENTIST_PROMPT
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.2,
        max_tokens: 8000,
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
      analysis_summary: analysisResult.executiveSummary,
      insights: analysisResult.edaInsights,
      recommendations: analysisResult.finalInsights,
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
