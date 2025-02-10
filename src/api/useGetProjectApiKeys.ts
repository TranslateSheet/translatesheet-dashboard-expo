import { useState, useEffect } from "react";
import apiFetch from "./utils/apiFetch";
import { useGlobalSearchParams } from "expo-router";
import { format } from "date-fns";
import { ApiKeyRow } from "./types";

type ApiKeyResponse = { message: string; data: ApiKeyRow[] };

const useGetProjectApiKeys = () => {
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();
  const [apiKeys, setApiKeys] = useState<ApiKeyRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setError("Project ID is required.");
      setApiKeys([]);
      return;
    }

    const fetchProjectAPIKey = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch the API key from the backend endpoint

        const response: ApiKeyResponse = await apiFetch(
          "api-keys/get-project-api-keys",
          {
            method: "POST",
            body: { projectId },
          }
        );

        const formattedApiKeys = response.data.map((apiKey) => {
          return {
            ...apiKey,
            created_at: format(new Date(apiKey.created_at), "MMM d, yyyy"),
            last_used_at: apiKey.last_used_at
              ? format(new Date(apiKey.last_used_at), "MMM d, yyyy")
              : "-",
            status: apiKey.is_active ? "active" : "disabled",
          };
        });

        setApiKeys(formattedApiKeys);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
        console.log({err});
        setApiKeys([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAPIKey();
  }, [projectId]);

  return { apiKeys, loading, error };
};

export default useGetProjectApiKeys;
