import { useState, useEffect } from "react";
import apiFetch from "./utils/apiFetch";
import { Database } from "../../lib/supabase/database.types";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";

export type ApiKey = Database["public"]["Tables"]["api_keys"]["Row"];

type ApiKeyResponse = { message: string; data: ApiKey };

const useGetProjectApiKey = () => {
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();
  const [apiKey, setApiKey] = useState<ApiKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setError("Project ID is required.");
      setApiKey(null);
      return;
    }

    const fetchProjectAPIKey = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch the API key from the backend endpoint

        const response: ApiKeyResponse = await apiFetch(
          "api-keys/get-project-api-key",
          {
            method: "POST",
            body: { projectId },
          }
        );

        setApiKey(response.data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
        setApiKey(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAPIKey();
  }, [projectId]);

  return { apiKey, loading, error };
};

export default useGetProjectApiKey;
