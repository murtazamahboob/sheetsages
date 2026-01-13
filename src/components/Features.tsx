import { 
  Brain, 
  Shield, 
  Zap, 
  Target, 
  BarChart3, 
  FileSearch 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Intelligent Analysis",
      description: "Advanced AI that understands context, not just numbers. Discovers insights humans miss."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Risk Detection",
      description: "Automatically flags anomalies, duplicates, and suspicious values before they become problems."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Results",
      description: "Get comprehensive analysis in seconds. No waiting, no complex setup required."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Actionable Decisions",
      description: "Clear, prioritized recommendations you can implement immediately."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Trend Analysis",
      description: "Identifies patterns and trends over time, comparing segments and categories."
    },
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "Data Validation",
      description: "Checks for missing values, outliers, and data quality issues automatically."
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Your Data, <span className="text-gradient">Decoded</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            SheetSage goes beyond basic analysis. It thinks like a senior data analyst 
            and communicates like a strategic advisor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors">
                <span className="text-primary">{feature.icon}</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
