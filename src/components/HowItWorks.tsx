import { Upload, Cpu, FileCheck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      step: "01",
      title: "Upload",
      description: "Drag and drop your CSV or Excel file. We support all common spreadsheet formats."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      step: "02",
      title: "Analyze",
      description: "Our AI examines every column, row, and relationship in your data."
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      step: "03",
      title: "Decide",
      description: "Get clear insights, warnings, and actionable recommendations in seconds."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            From data to decisions in three simple steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/30 to-transparent" />
                )}
                
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-card border border-border shadow-soft mb-6 relative">
                  <span className="text-primary">{step.icon}</span>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-gradient-hero text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                
                <h3 className="font-display font-semibold text-xl mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
