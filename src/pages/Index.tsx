import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FileUpload from "@/components/FileUpload";
import EnhancedAnalysisResult from "@/components/EnhancedAnalysisResult";
import Footer from "@/components/Footer";
import { generateSampleDataScienceAnalysis } from "@/lib/sampleDataScienceAnalysis";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { DataScienceAnalysis } from "@/types/dataScienceAnalysis";

const Index = () => {
  const [analysisData, setAnalysisData] = useState<DataScienceAnalysis | null>(null);
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

      // Use the comprehensive DataScienceAnalysis directly from the edge function
      const result = response.data as DataScienceAnalysis;
      setAnalysisData(result);
      toast({
        title: "Analysis complete!",
        description: "Your spreadsheet has been analyzed by our Senior Data Scientist AI.",
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
        const analysis = generateSampleDataScienceAnalysis(file.name);
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
          <EnhancedAnalysisResult 
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
