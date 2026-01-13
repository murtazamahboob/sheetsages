import { Check, X, Sparkles, Zap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      icon: <Sparkles className="w-5 h-5" />,
      price: "$0",
      period: "forever",
      description: "Perfect for trying out SheetSage",
      features: [
        { text: "3 analyses per month", included: true },
        { text: "Up to 1,000 rows per file", included: true },
        { text: "Basic insights & summary", included: true },
        { text: "CSV file support", included: true },
        { text: "Excel file support", included: false },
        { text: "Risk detection", included: false },
        { text: "Opportunity analysis", included: false },
        { text: "Priority actions", included: false },
        { text: "Export reports", included: false },
        { text: "API access", included: false },
      ],
      cta: "Get Started Free",
      variant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro",
      icon: <Zap className="w-5 h-5" />,
      price: "$29",
      period: "per month",
      description: "For professionals who need deeper insights",
      features: [
        { text: "50 analyses per month", included: true },
        { text: "Up to 100,000 rows per file", included: true },
        { text: "Advanced insights & summary", included: true },
        { text: "CSV & Excel file support", included: true },
        { text: "Excel file support", included: true },
        { text: "Risk detection", included: true },
        { text: "Opportunity analysis", included: true },
        { text: "Priority actions", included: true },
        { text: "Export reports (PDF, CSV)", included: true },
        { text: "API access", included: false },
      ],
      cta: "Start Pro Trial",
      variant: "hero" as const,
      popular: true,
    },
    {
      name: "Business",
      icon: <Building2 className="w-5 h-5" />,
      price: "$99",
      period: "per month",
      description: "For teams that need enterprise features",
      features: [
        { text: "Unlimited analyses", included: true },
        { text: "Unlimited rows per file", included: true },
        { text: "Advanced insights & summary", included: true },
        { text: "All file formats supported", included: true },
        { text: "Excel file support", included: true },
        { text: "Risk detection + alerts", included: true },
        { text: "Opportunity analysis", included: true },
        { text: "Priority actions + tracking", included: true },
        { text: "White-label reports", included: true },
        { text: "Full API access", included: true },
      ],
      cta: "Contact Sales",
      variant: "outline" as const,
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
            <span className="text-sm text-muted-foreground">Simple, transparent pricing</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-gradient">Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Start free and upgrade as your data analysis needs grow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-card border-2 border-primary shadow-glow scale-[1.02]'
                  : 'bg-card border border-border shadow-soft hover:shadow-medium hover:border-primary/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-gradient-hero text-primary-foreground text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                  plan.popular ? 'bg-primary/10' : 'bg-secondary'
                }`}>
                  <span className="text-primary">{plan.icon}</span>
                </div>
                <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="font-display font-bold text-4xl">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                    <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                variant={plan.variant} 
                className="w-full" 
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-16 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>No credit card required for free plan</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>14-day free trial on Pro</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
