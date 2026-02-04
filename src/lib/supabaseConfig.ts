// Supabase configuration validation utility
// Ensures graceful handling when env vars are missing

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  const configured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
  
  if (!configured) {
    console.error(
      '⚠️ Supabase is not configured. Please set the following environment variables:\n' +
      '  - VITE_SUPABASE_URL: Your Supabase project URL\n' +
      '  - VITE_SUPABASE_ANON_KEY: Your Supabase anon/public key\n\n' +
      'For Netlify deployment, add these in Site Settings → Environment Variables.'
    );
  }
  
  return configured;
};

export const getSupabaseConfig = () => ({
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
  isConfigured: isSupabaseConfigured(),
});
