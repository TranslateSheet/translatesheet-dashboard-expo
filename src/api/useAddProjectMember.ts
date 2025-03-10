import { useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { ProjectMemberInsert, ProjectMemberRole } from "./types";
import apiFetch from "./utils/apiFetch";

const useAddProjectMember = () => {
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const addProjectMember = async ({
    projectMemberRole,
    projectMemberEmail,
  }: {
    projectMemberRole: ProjectMemberRole;
    projectMemberEmail: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!projectId || !projectMemberRole) {
        throw new Error("Project ID and Project Member role are required");
      }

      const projectMemberToInsert: ProjectMemberInsert = {
        project_id: projectId,
        role: projectMemberRole,
        invited_email: projectMemberEmail,
      };

      const res = await apiFetch("project-members/create", {
        method: "POST",
        body: projectMemberToInsert,
      });
      console.log(res);

      // Invalidate the projectMembers query to trigger a refetch
      queryClient.invalidateQueries({
        queryKey: ["projectMembers", projectId],
      });

      return res;
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
