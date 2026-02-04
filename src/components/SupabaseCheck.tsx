import { isSupabaseConfigured } from "@/lib/supabaseConfig";
import { AlertTriangle } from "lucide-react";

interface SupabaseCheckProps {
  children: React.ReactNode;
}

const SupabaseCheck = ({ children }: SupabaseCheckProps) => {
  const configured = isSupabaseConfigured();

  if (!configured) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-4">Configuration Required</h1>
          <p className="text-muted-foreground mb-6">
            The backend is not configured. Please set the following environment variables:
          </p>
          <div className="bg-card border border-border rounded-xl p-4 text-left mb-6">
            <code className="text-sm block mb-2">
              <span className="text-primary">VITE_SUPABASE_URL</span>=your-project-url
            </code>
            <code className="text-sm block">
              <span className="text-primary">VITE_SUPABASE_ANON_KEY</span>=your-anon-key
            </code>
          </div>
          <p className="text-sm text-muted-foreground">
            For Netlify: Add these in Site Settings → Environment Variables
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SupabaseCheck;
