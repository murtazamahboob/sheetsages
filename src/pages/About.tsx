import { FileSpreadsheet, Sparkles, Shield, Zap, BarChart3, Brain } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Powered Spreadsheet Analysis</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">SheetSage</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              SheetSage is an AI-powered cloud SaaS platform that analyzes spreadsheets, 
              generates automated summaries, insights, and calculations for Excel, CSV, and similar files.
            </p>
          </div>

          {/* What We Do */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <h2 className="font-display text-2xl font-bold mb-6">What is SheetSage?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  SheetSage is your intelligent spreadsheet companion that transforms raw data into actionable insights. 
                  Our platform uses advanced AI technology, including the Groq API, to analyze your spreadsheets 
                  with unprecedented precision and speed.
                </p>
                <p>
                  Whether you're a business analyst looking for trends, a financial professional needing risk assessments, 
                  or a team lead wanting quick summaries of complex data, SheetSage delivers insights that help you 
                  make better decisions faster.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="font-display text-2xl font-bold text-center mb-12">What You Get</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Brain className="w-6 h-6" />,
                  title: "AI-Powered Analysis",
                  description: "Advanced AI examines your data to find patterns, anomalies, and opportunities you might miss."
                },
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: "Automated Summaries",
                  description: "Get instant executive summaries of your spreadsheets with key metrics highlighted."
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Risk Detection",
                  description: "Identify potential risks and issues in your data before they become problems."
                },
                {
                  icon: <FileSpreadsheet className="w-6 h-6" />,
                  title: "File Compatibility",
                  description: "Support for Excel (.xlsx, .xls), CSV, and other spreadsheet formats."
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "Smart Insights",
                  description: "Receive actionable recommendations based on your data analysis."
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Secure Processing",
                  description: "Your data is encrypted and deleted after analysis. Privacy is our priority."
                },
              ].map((feature, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-soft transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary">{feature.icon}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-subtle border border-border rounded-2xl p-8 md:p-12">
              <h2 className="font-display text-2xl font-bold mb-4">Ready to analyze your data?</h2>
              <p className="text-muted-foreground mb-6">
                Start with our free plan and experience the power of AI-driven spreadsheet analysis.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button variant="hero" size="lg">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/#pricing">
                  <Button variant="outline" size="lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
