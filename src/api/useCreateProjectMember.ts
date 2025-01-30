import { useState } from "react";
import { Database } from "../../lib/supabase/database.types";
import { supabase } from "../../lib/supabase";

type ProjectMemberInsert =
  Database["public"]["Tables"]["project_members"]["Insert"];

const useCreateProjectMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProjectMember = async (projectMember: ProjectMemberInsert) => {
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!projectMember.user_id || !projectMember.project_id) {
        throw new Error("User ID and Project ID are required");
      }

      // Insert the new project member into Supabase
      const { data, error: supabaseError } = await supabase
        .from("project_members")
        .insert(projectMember)
        .select("id, user_id, project_id, role")
        .single();

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      return data;
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createProjectMember, loading, error };
};

export default useCreateProjectMember;
