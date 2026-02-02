import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileSpreadsheet, 
  TrendingUp, 
  Clock, 
  Crown, 
  ChevronRight,
  Loader2,
  BarChart3,
  Calendar
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  full_name: string | null;
  email: string;
  subscription_plan: "free" | "pro" | "business";
  monthly_analysis_count: number;
  analysis_reset_date: string;
  avatar_url: string | null;
}

interface AnalysisHistory {
  id: string;
  file_name: string;
  file_size: number | null;
  created_at: string;
  analysis_summary: any;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setUser(session.user);
      await fetchUserData(session.user.id);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (profileError) throw profileError;
      if (profileData) {
        setProfile(profileData as Profile);
      }

      // Fetch analysis history
      const { data: historyData, error: historyError } = await supabase
        .from("analysis_history")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (historyError) throw historyError;
      if (historyData) {
        setHistory(historyData as AnalysisHistory[]);
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPlanLimits = (plan: string) => {
    switch (plan) {
      case "free": return 3;
      case "pro": return 100;
      case "business": return -1; // unlimited
      default: return 0;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const planLimit = profile ? getPlanLimits(profile.subscription_plan) : 0;
  const usagePercentage = planLimit === -1 ? 0 : ((profile?.monthly_analysis_count || 0) / planLimit) * 100;
  const daysUntilReset = profile ? Math.ceil((new Date(profile.analysis_reset_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-3xl font-bold mb-2">
              Welcome back, {profile?.full_name || user?.user_metadata?.name || "User"}!
            </h1>
            <p className="text-muted-foreground">
              Manage your analyses and subscription
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Subscription Card */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-primary" />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profile?.subscription_plan === "business" 
                    ? "bg-gradient-hero text-primary-foreground"
                    : profile?.subscription_plan === "pro"
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {profile?.subscription_plan?.toUpperCase() || "FREE"}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">Current Plan</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {profile?.subscription_plan === "business" 
                  ? "Unlimited analyses"
                  : profile?.subscription_plan === "pro"
                  ? "100 analyses/month"
                  : "3 analyses/month"}
              </p>
              {profile?.subscription_plan === "free" && (
                <Button variant="hero" size="sm" className="w-full" onClick={() => navigate("/#pricing")}>
                  Upgrade Plan
                </Button>
              )}
            </div>

            {/* Usage Card */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-2xl font-display font-bold">
                  {profile?.monthly_analysis_count || 0}
                  {planLimit !== -1 && <span className="text-sm text-muted-foreground font-normal">/{planLimit}</span>}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">Monthly Usage</h3>
              {planLimit !== -1 && (
                <div className="mt-2">
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        usagePercentage >= 90 ? "bg-destructive" : "bg-primary"
                      }`}
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {planLimit - (profile?.monthly_analysis_count || 0)} analyses remaining
                  </p>
                </div>
              )}
              {planLimit === -1 && (
                <p className="text-sm text-muted-foreground">Unlimited analyses</p>
              )}
            </div>

            {/* Reset Date Card */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <span className="text-2xl font-display font-bold">{daysUntilReset}</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">Days Until Reset</h3>
              <p className="text-sm text-muted-foreground">
                Resets on {profile ? new Date(profile.analysis_reset_date).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          {/* Analysis History */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-soft animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display font-semibold text-xl">Recent Analyses</h2>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                <TrendingUp className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12">
                <FileSpreadsheet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-lg mb-2">No analyses yet</h3>
                <p className="text-muted-foreground mb-4">
                  Upload a spreadsheet to get started with AI-powered insights
                </p>
                <Button variant="hero" onClick={() => navigate("/")}>
                  Analyze Your First File
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item, index) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileSpreadsheet className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.file_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(item.file_size)} • {formatDate(item.created_at)}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
