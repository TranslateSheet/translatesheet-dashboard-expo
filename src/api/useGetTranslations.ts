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
      // Join translation_keys and translations to get the required data
      const { data, error } = await supabase
        .from("translation_keys")
        .select(`
          id,
          namespace,
          key_name,
          translations (
            language,
            value,
            created_at,
            last_updated_at,
            confidence_score
          )
        `)
        .eq("project_id", projectId);

      if (error) {
        console.error("Error fetching translations:", error);
        throw new Error("Failed to fetch translations.");
      }

      // Flatten the nested structure to match the Translation type
      const flattenedTranslations: Translation[] = data.flatMap((keyItem) => 
        keyItem.translations.map((translation, index) => ({
          id: keyItem.id + index, // Use a combination of translation key and index for uniqueness
          namespace: keyItem.namespace as string,
          key: keyItem.key_name as string,
          language: translation.language as string,
          value: translation.value as string,
          createdAt: new Date(translation.created_at),
          lastUpdatedAt: translation.last_updated_at ? new Date(translation.last_updated_at) : null,
          confidenceScore: translation.confidence_score || null,
        }))
      );

      return flattenedTranslations;
    },

    enabled: !!projectId, // Only fetch if projectId is available
  });
};
