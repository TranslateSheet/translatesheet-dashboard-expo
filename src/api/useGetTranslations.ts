import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";

export type Translation = {
  id: number;
  namespace: string;
  key: string;
  createdAt: Date;
  lastUpdatedAt: Date | null;
  language: string;
  value: string;
  confidenceScore: number | null;
};

export const useGetTranslations = ({ projectId }: { projectId: string }) => {
  return useQuery({
    queryKey: ["translations", projectId],
    queryFn: async (): Promise<Translation[]> => {
      const { data, error } = await supabase
        .from("aggregated_translations_flat_again")
        .select(
          "namespace, key, language, translation, created_at, last_updated_at, confidence_score"
        )
        .eq("project_id", projectId);

      if (error) {
        console.error("Error fetching translations:", error);
        throw new Error("Failed to fetch translations.");
      }

      // Transform data to match the Translation type
      const flattenedTranslations: Translation[] = data.map((item, index) => ({
        id: index + 1, // Generate sequential IDs
        namespace: item.namespace as string,
        key: item.key as string,
        language: item.language as string,
        value: item.translation as string,
        createdAt: new Date(item.created_at),
        lastUpdatedAt: item.last_updated_at ? new Date(item.last_updated_at) : null,
        confidenceScore: item.confidence_score || null,
      }));

      return flattenedTranslations;
    },

    enabled: !!projectId, // Only fetch if projectId is available
  });
};
