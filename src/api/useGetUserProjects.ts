import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useSession } from "@/providers/AuthContext";
import { ProjectsRow } from "./types";

const useGetUserProjects = () => {
  const [projects, setProjects] = useState<ProjectsRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSession();

  useEffect(() => {
    if (!session?.user) {
      setProjects(null);
      setError("User ID is required");
      return;
    }

    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from("project_members")
          .select(
            `
            projects (id, name, created_at, updated_at, primary_language)
          `
          )
          .eq("user_id", session.user.id);

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        if (!data || data.length === 0) {
          setProjects([]);
          setError("No projects found for the user.");
          return;
        }

        // Extract the projects field directly
        const projectList = data.map((entry) => entry.projects);
        setProjects(projectList);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [session?.user]);

  return { projects, loading, error };
};

export default useGetUserProjects;
