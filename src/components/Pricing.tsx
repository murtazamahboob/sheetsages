import { Check, X, Sparkles, Zap, Rocket, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const plans = [
    {
      name: "Free",
      icon: <Sparkles className="w-5 h-5" />,
      price: billingCycle === "monthly" ? "$0" : "$0",
      period: "forever",
      description: "Basic data profiling & EDA",
      features: [
        { text: "3 analyses per month", included: true },
        { text: "Up to 1,000 rows per file", included: true },
        { text: "Basic data profiling", included: true },
        { text: "Exploratory Data Analysis", included: true },
        { text: "Model recommendations", included: true },
        { text: "CSV file support", included: true },
        { text: "Feature engineering", included: false },
        { text: "Model training", included: false },
        { text: "AutoML engine", included: false },
        { text: "Downloadable reports", included: false },
      ],
      cta: "Get Started Free",
      ctaLink: "/signup",
      variant: "outline" as const,
      popular: false,
      gradient: "from-slate-500/10 to-slate-600/10",
      iconBg: "bg-slate-500/10",
      iconColor: "text-slate-500",
    },
    {
      name: "Pro",
      icon: <Zap className="w-5 h-5" />,
      price: billingCycle === "monthly" ? "$29" : "$290",
      period: billingCycle === "monthly" ? "per month" : "per year",
      description: "Full EDA & model training",
      features: [
        { text: "50 analyses per month", included: true },
        { text: "Up to 100,000 rows per file", included: true },
        { text: "Full data profiling & EDA", included: true },
        { text: "Feature engineering", included: true },
        { text: "Model training & evaluation", included: true },
        { text: "CSV & Excel support", included: true },
        { text: "Limited AutoML (3 models)", included: true },
        { text: "Downloadable PDF reports", included: true },
        { text: "Full AutoML engine", included: false },
        { text: "Deployment artifacts", included: false },
      ],
      cta: "Start Pro Trial",
      ctaLink: "/signup",
      variant: "hero" as const,
      popular: true,
      gradient: "from-primary/20 to-primary/10",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      name: "Advanced",
      icon: <Rocket className="w-5 h-5" />,
      price: billingCycle === "monthly" ? "$79" : "$790",
      period: billingCycle === "monthly" ? "per month" : "per year",
      description: "Full AutoML & deployment",
      features: [
        { text: "200 analyses per month", included: true },
        { text: "Up to 500,000 rows per file", included: true },
        { text: "Full AutoML engine", included: true },
        { text: "Best-model auto-selection", included: true },
        { text: "Hyperparameter optimization", included: true },
        { text: "Cross-validation analysis", included: true },
        { text: "Deployment artifacts", included: true },
        { text: "MLOps & monitoring guidance", included: true },
        { text: "Drift detection setup", included: true },
        { text: "Priority support", included: true },
      ],
      cta: "Go Advanced",
      ctaLink: "/signup",
      variant: "outline" as const,
      popular: false,
      gradient: "from-violet-500/10 to-purple-500/10",
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      name: "Enterprise",
      icon: <Building2 className="w-5 h-5" />,
      price: "Custom",
      period: "tailored pricing",
      description: "Custom limits & dedicated compute",
      features: [
        { text: "Unlimited analyses", included: true },
        { text: "Unlimited rows per file", included: true },
        { text: "Dedicated compute resources", included: true },
        { text: "Custom model training", included: true },
        { text: "White-label reports", included: true },
        { text: "Custom integrations", included: true },
        { text: "SSO & advanced security", included: true },
        { text: "SLA guarantee", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "On-premise deployment", included: true },
      ],
      cta: "Contact Sales",
      ctaLink: "/contact",
      variant: "outline" as const,
      popular: false,
      gradient: "from-amber-500/10 to-orange-500/10",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6 hover-scale">
            <span className="text-sm text-muted-foreground">Simple, transparent pricing</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-gradient">Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            From basic data profiling to enterprise-grade AutoML solutions
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-secondary border border-border">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                billingCycle === "yearly"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl p-6 transition-all duration-500 animate-fade-in ${
                plan.popular
                  ? "bg-card border-2 border-primary shadow-glow lg:scale-105 lg:-my-4 z-10"
                  : "bg-card border border-border shadow-soft hover:shadow-medium hover:border-primary/30"
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: plan.popular ? undefined : "perspective(1000px)",
              }}
              onMouseEnter={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.transform = "perspective(1000px) rotateX(-2deg) rotateY(2deg) translateY(-8px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
                }
              }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-scale-in">
                  <span className="px-4 py-1.5 rounded-full bg-gradient-hero text-primary-foreground text-sm font-medium shadow-glow whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${plan.iconBg}`}>
                    <span className={plan.iconColor}>{plan.icon}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="font-display font-bold text-3xl transition-all duration-300 group-hover:scale-105">
                      {plan.price}
                    </span>
                    {plan.period !== "forever" && plan.price !== "Custom" && (
                      <span className="text-muted-foreground text-sm">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-2.5 text-sm transition-all duration-200 group-hover:translate-x-1"
                      style={{ 
                        transitionDelay: `${featureIndex * 30}ms`,
                        opacity: feature.included ? 1 : 0.5 
                      }}
                    >
                      {feature.included ? (
                        <div className="w-4 h-4 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110">
                          <Check className="w-2.5 h-2.5 text-success" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-2.5 h-2.5 text-muted-foreground" />
                        </div>
                      )}
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground line-through"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.ctaLink === "/contact" ? (
                  <Link to={plan.ctaLink} className="block">
                    <Button
                      variant={plan.variant}
                      className={`w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group/btn`}
                      size="lg"
                    >
                      {plan.cta}
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant={plan.variant}
                    className={`w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group/btn ${
                      plan.popular ? "shadow-glow" : ""
                    }`}
                    size="lg"
                    onClick={() => {
                      if (user) {
                        // User is logged in - go to dashboard (or checkout when ready)
                        navigate("/dashboard");
                      } else {
                        // User not logged in - go to signup
                        navigate(plan.ctaLink);
                      }
                    }}
                  >
                    {user ? (plan.name === "Free" ? "Go to Dashboard" : `Get ${plan.name}`) : plan.cta}
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-16 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <Check className="w-4 h-4 text-success" />
            <span>No credit card required for free plan</span>
          </div>
          <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <Check className="w-4 h-4 text-success" />
            <span>14-day free trial on paid plans</span>
          </div>
          <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <Check className="w-4 h-4 text-success" />
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Payment Badge */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <p className="text-sm text-muted-foreground">
            Secure payments powered by <span className="font-medium">Lemon Squeezy</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
