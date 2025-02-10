import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { ProjectMemberInsert, ProjectMemberRole } from "./types";
import { useGlobalSearchParams } from "expo-router";


const useAddProjectMember = () => {
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addProjectMember = async ({
    projectMemberRole,
  }: {
    projectMemberRole: ProjectMemberRole;
  }) => {
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!projectId || !projectMemberRole) {
        throw new Error("Project ID and Project Member role are required");
      }

      const projectMemberToInsert: ProjectMemberInsert = {
        created_at: Date.now().toString(),
        project_id: projectId,
        role: projectMemberRole,
        // because we can invite users who dont yet have an account.
        user_id: "TODO:"
      }

      // Insert the new project member into Supabase
      const { data, error: supabaseError } = await supabase
        .from("project_members")
        .insert(projectMemberToInsert)
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

  return { addProjectMember, loading, error };
};

export default useAddProjectMember;
