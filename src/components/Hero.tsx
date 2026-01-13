import { ArrowRight, FileSpreadsheet, Lightbulb, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">AI-Powered Spreadsheet Intelligence</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            Turn Data Into
            <span className="block text-gradient">Decisions</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            SheetSage.ai is your expert AI Data Analyst. Upload any spreadsheet and get 
            instant insights, risk detection, and actionable recommendations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button variant="hero" size="xl" onClick={onGetStarted} className="group">
              Analyze Your Data
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero-outline" size="xl">
              See Demo
            </Button>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <FeaturePill icon={<Lightbulb className="w-4 h-4" />} text="Discover Hidden Insights" />
            <FeaturePill icon={<Shield className="w-4 h-4" />} text="Detect Risks & Anomalies" />
            <FeaturePill icon={<TrendingUp className="w-4 h-4" />} text="Identify Opportunities" />
          </div>
        </div>

        {/* Floating cards decoration */}
        <div className="hidden lg:block absolute top-1/3 left-8 animate-float">
          <FloatingCard icon={<FileSpreadsheet className="w-5 h-5 text-primary" />} delay="0s" />
        </div>
        <div className="hidden lg:block absolute top-1/2 right-12 animate-float" style={{ animationDelay: '2s' }}>
          <FloatingCard icon={<TrendingUp className="w-5 h-5 text-success" />} delay="2s" />
        </div>
        <div className="hidden lg:block absolute bottom-1/3 left-16 animate-float" style={{ animationDelay: '4s' }}>
          <FloatingCard icon={<Lightbulb className="w-5 h-5 text-opportunity" />} delay="4s" />
        </div>
      </div>
    </section>
  );
};

const FeaturePill = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-soft">
    <span className="text-primary">{icon}</span>
    <span className="text-sm font-medium text-foreground">{text}</span>
  </div>
);

const FloatingCard = ({ icon, delay }: { icon: React.ReactNode; delay: string }) => (
  <div 
    className="w-14 h-14 rounded-xl bg-card border border-border shadow-medium flex items-center justify-center backdrop-blur-sm"
    style={{ animationDelay: delay }}
  >
    {icon}
  </div>
);

export default Hero;
