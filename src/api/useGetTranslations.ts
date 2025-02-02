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
  originalValue?: string; // <-- new
};

export const useGetTranslations = ({ projectId }: { projectId: string }) => {
  return useQuery({
    queryKey: ["translations", projectId],
    queryFn: async (): Promise<Translation[]> => {
      // 1) Get the primary language
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("primary_language")
        .eq("id", projectId)
        .single();

      if (projectError) {
        console.error("Error fetching project info:", projectError);
        throw new Error("Failed to fetch project info.");
      }

      const primaryLanguage = projectData?.primary_language;
      if (!primaryLanguage) {
        console.warn("No primary_language set on this project.");
      }

      // 2) Get all translation_keys with their translations
      const { data: translationKeysData, error: translationKeysError } = await supabase
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

      if (translationKeysError) {
        console.error("Error fetching translations:", translationKeysError);
        throw new Error("Failed to fetch translations.");
      }

      // 3) Build a map of originalValue for each key, using the primary language
      let primaryLanguageMap = new Map<number, string>();
      if (primaryLanguage) {
        // fetch only translations that match the primary language
        const { data: primaryLangData, error: primaryLangError } = await supabase
          .from("translations")
          .select("key_id, value")
          .in(
            "key_id",
            translationKeysData.map((k) => k.id)
          )
          .eq("language", primaryLanguage);

        if (primaryLangError) {
          console.error("Error fetching primary language translations:", primaryLangError);
          throw new Error("Failed to fetch primary language translations.");
        }

        // create a map: keyId => originalValue
        primaryLangData?.forEach((row) => {
          primaryLanguageMap.set(row.key_id, row.value);
        });
      }

      // 4) Flatten the nested translations structure
      //    and attach originalValue from our map
      const flattenedTranslations: Translation[] = translationKeysData.flatMap((keyItem) =>
        keyItem.translations.map((translation, index) => ({
          id: keyItem.id + index, // a pseudo ID
          namespace: keyItem.namespace as string,
          key: keyItem.key_name as string,
          language: translation.language as string,
          value: translation.value as string,
          createdAt: new Date(translation.created_at),
          lastUpdatedAt: translation.last_updated_at
            ? new Date(translation.last_updated_at)
            : null,
          confidenceScore: translation.confidence_score || null,
          originalValue: primaryLanguageMap.get(keyItem.id), // attach the original
        }))
      );

      return flattenedTranslations;
    },
    enabled: !!projectId,
  });
};
