import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FileUpload from "@/components/FileUpload";
import AnalysisResult, { AnalysisData } from "@/components/AnalysisResult";
import Footer from "@/components/Footer";
import { generateSampleAnalysis } from "@/lib/sampleAnalysis";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userPlan, setUserPlan] = useState<string>("free");
  const uploadRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserPlan(session.user.id);
      }
    });

    // Then get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserPlan(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserPlan = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("subscription_plan")
      .eq("user_id", userId)
      .single();
    
    if (data) {
      setUserPlan(data.subscription_plan);
    }
  };

  const scrollToUpload = () => {
    if (!user) {
      toast({
        title: "Sign up required",
        description: "Please create an account or sign in to analyze spreadsheets.",
      });
      navigate("/signup");
      return;
    }
    uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileSelect = async (file: File) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to analyze spreadsheets.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);

    try {
      // Read file content
      const fileContent = await readFileContent(file);
      
      // Get auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No active session");
      }

      // Call the edge function
      const response = await supabase.functions.invoke("analyze-spreadsheet", {
        body: {
          fileContent,
          fileName: file.name,
          fileSize: file.size,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Analysis failed");
      }

      // Transform the response to match our AnalysisData interface
      const result = response.data;
      const transformedData: AnalysisData = {
        summary: result.summary?.keyMetrics?.map((m: any) => `${m.label}: ${m.value}`).join(", ") || "Analysis complete",
        datasetInfo: `${result.summary?.totalRows || 0} rows × ${result.summary?.totalColumns || 0} columns | Data Quality: ${result.summary?.dataQuality || "Good"}`,
        insights: result.insights?.filter((i: any) => i.type === "trend" || i.type === "opportunity").map((i: any) => i.description) || [],
        warnings: result.insights?.filter((i: any) => i.type === "risk").map((i: any) => ({
          text: i.description,
          severity: i.impact as "low" | "medium" | "high",
        })) || [],
        opportunities: result.insights?.filter((i: any) => i.type === "opportunity").map((i: any) => i.description) || [],
        actions: result.recommendations?.map((r: any) => r.action) || [],
        stats: {
          rows: result.summary?.totalRows || 0,
          columns: result.summary?.totalColumns || 0,
          issues: result.insights?.filter((i: any) => i.type === "risk").length || 0,
        },
      };

      setAnalysisData(transformedData);
      toast({
        title: "Analysis complete!",
        description: "Your spreadsheet has been analyzed successfully.",
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      
      // Fallback to sample analysis if edge function fails
      if (error.message?.includes("limit reached")) {
        toast({
          title: "Limit reached",
          description: "You've reached your monthly analysis limit. Please upgrade your plan.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Using demo analysis",
          description: "We're showing sample results. Connect your Groq API for real analysis.",
        });
        const analysis = generateSampleAnalysis(file.name);
        setAnalysisData(analysis);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const handleNewAnalysis = () => {
    setAnalysisData(null);
    setFileName("");
    setTimeout(scrollToUpload, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {analysisData ? (
        <div className="pt-16">
          <AnalysisResult 
            data={analysisData} 
            fileName={fileName}
            onNewAnalysis={handleNewAnalysis}
            userPlan={userPlan}
          />
        </div>
      ) : (
        <>
          <Hero onGetStarted={scrollToUpload} />
          <Features />
          <HowItWorks />
          <Pricing />
          <div ref={uploadRef}>
            <FileUpload 
              onFileSelect={handleFileSelect} 
              isProcessing={isProcessing}
              isAuthenticated={!!user}
            />
          </div>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
