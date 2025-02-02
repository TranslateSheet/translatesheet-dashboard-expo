import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { languageInfo } from "@/components/translations/TranslationsTable/constants/languageInfo";
import { useGlobalSearchParams } from "expo-router";

type SupportedLanguage = {
  code: string;
  name: string;
  flag: string;
};

export const useGetProjectSupportedLanguages = () => {
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();
  const [languages, setLanguages] = useState<SupportedLanguage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("translation_keys")
          .select("translations(language)")
          .eq("project_id", projectId);

        if (error) {
          throw new Error("Failed to fetch languages.");
        }

        if (data) {
          // Flatten and extract unique languages
          const uniqueLanguages = Array.from(
            new Set(
              data.flatMap((item: { translations: { language: string }[] }) =>
                item.translations.map((t) => t.language)
              )
            )
          );

          // Map each language to its name and flag
          const languageOptions: SupportedLanguage[] = [
            { code: "all", name: "All Languages", flag: "🌎" }, // Default option
            ...uniqueLanguages.map((code) => ({
              code,
              name: languageInfo[code]?.name || "Unknown",
              flag: languageInfo[code]?.flag || "🏳️", // Default neutral flag if not found
            })),
          ];

          setLanguages(languageOptions);
        }
      } catch (err) {
        console.error("Error fetching project-supported languages:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchLanguages();
    }
  }, [projectId]);

  return { languages, isLoading, error };
};
