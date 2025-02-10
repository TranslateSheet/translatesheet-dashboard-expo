import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";

// If you want a truly custom flattened shape, define it explicitly:
export interface FlattenedTranslation {
  // from translations table
  id: number;
  // Instead of storing as string, we’ll convert to Date
  createdAt: string;
  lastUpdatedAt: string | null;
  language: string;
  value: string;
  confidenceScore: number | null;
  // The translation_keys info
  key: string; // was "keyItem.key_name"
  namespace: string;
  // Additional custom field
  originalValue?: string;
}

export const useGetTranslations = ({ projectId }: { projectId: string }) => {
  return useQuery({
    queryKey: ["translations", projectId],
    queryFn: async (): Promise<FlattenedTranslation[]> => {
      // 1) Fetch the project's primary_language
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("primary_language")
        .eq("id", projectId)
        .single();

      if (projectError) {
        throw new Error("Failed to fetch project info");
      }

      const primaryLanguage = projectData?.primary_language ?? null;

      // 2) Fetch translation_keys and their related translations
      const { data: translationKeysData, error: translationKeysError } =
        await supabase
          .from("translation_keys")
          .select(
            `
            id,
            namespace,
            key_name,
            translations (
              id,
              key_id,
              language,
              value,
              created_at,
              last_updated_at,
              confidence_score
            )
          `
          )
          .eq("project_id", projectId);

      if (translationKeysError) {
        throw new Error("Failed to fetch translation keys");
      }

      // 3) Build a map of originalValue for each key (the primary language string)
      const primaryLanguageMap = new Map<number, string>();

      if (primaryLanguage) {
        const { data: primaryLangData, error: primaryLangError } =
          await supabase
            .from("translations")
            .select("id, key_id, value")
            .in(
              "key_id",
              translationKeysData.map((k) => k.id)
            )
            .eq("language", primaryLanguage);

        if (primaryLangError) {
          throw new Error("Failed to fetch primary language translations");
        }

        primaryLangData?.forEach((row) => {
          if (row.key_id) {
            primaryLanguageMap.set(row.key_id, row.value);
          }
        });
      }

      {
      }

      // 4) Flatten everything into your custom FlattenedTranslation
      const flattened: FlattenedTranslation[] = translationKeysData.flatMap(
        (keyItem) => {
          return keyItem.translations.map((t) => {
            return {
              id: t.id,
              // Convert string to Date
              createdAt: t.created_at
                ? new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(new Date(t.created_at)))
                : new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(new Date())),
              lastUpdatedAt: t.last_updated_at
                ? new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(new Date(t.last_updated_at)))
                : null,
              language: t.language,
              value: t.value,
              confidenceScore: t.confidence_score ?? null,
              // from translation_keys
              key: keyItem.key_name,
              namespace: keyItem.namespace,
              originalValue: primaryLanguageMap.get(keyItem.id),
            };
          });
        }
      );

      return flattened;
    },
    enabled: !!projectId,
  });
};
