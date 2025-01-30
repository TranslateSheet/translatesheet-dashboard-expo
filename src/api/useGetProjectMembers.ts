import { useState, useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabase";
import { Database } from "../../lib/supabase/database.types";

// Automatically infer the CombinedProjectMember type from the database
export type CombinedProjectMember = Database["public"]["Views"]["combined_project_members"]["Row"];

const useGetProjectMembers = () => {
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();
  const [combinedMembers, setCombinedMembers] = useState<CombinedProjectMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setError("Project ID is required.");
      setCombinedMembers([]);
      return;
    }

    const fetchProjectMembers = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch data from the view using inferred types
        const { data, error } = await supabase
          .from("combined_project_members")
          .select("*")
          .eq("project_id", projectId);

        if (error) {
          throw new Error(error.message);
        }

        setCombinedMembers(data || []);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
        setCombinedMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectMembers();
  }, [projectId]);

  return { combinedMembers, loading, error };
};

export default useGetProjectMembers;
