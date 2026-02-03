import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface AnalysisHistory {
  id: string;
  user_id: string;
  file_name: string;
  file_size: number | null;
  analysis_summary: Record<string, unknown> | null;
  insights: Record<string, unknown> | null;
  recommendations: Record<string, unknown> | null;
  created_at: string;
}

export function useRealtimeAnalysis(userId: string | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("analysis-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "analysis_history",
          filter: `user_id=eq.${userId}`,
        },
        (payload: RealtimePostgresChangesPayload<AnalysisHistory>) => {
          console.log("Realtime analysis update:", payload);
          
          // Invalidate queries to refresh data
          queryClient.invalidateQueries({ queryKey: ["analysis-history", userId] });
          
          // You can also update the cache directly for better UX
          if (payload.eventType === "INSERT") {
            queryClient.setQueryData(
              ["analysis-history", userId],
              (old: AnalysisHistory[] | undefined) => {
                if (!old) return [payload.new];
                return [payload.new, ...old];
              }
            );
          } else if (payload.eventType === "DELETE") {
            queryClient.setQueryData(
              ["analysis-history", userId],
              (old: AnalysisHistory[] | undefined) => {
                if (!old) return [];
                return old.filter((item) => item.id !== (payload.old as AnalysisHistory)?.id);
              }
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);
}
