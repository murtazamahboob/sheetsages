import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FileUpload from "@/components/FileUpload";
import AnalysisResult, { AnalysisData } from "@/components/AnalysisResult";
import Footer from "@/components/Footer";
import { generateSampleAnalysis } from "@/lib/sampleAnalysis";

const Index = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const uploadRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate sample analysis (in production, this would call your AI backend)
    const analysis = generateSampleAnalysis(file.name);
    setAnalysisData(analysis);
    setIsProcessing(false);
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
            />
          </div>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
