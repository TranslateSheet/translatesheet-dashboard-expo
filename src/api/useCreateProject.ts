import { useState } from "react";
import useCreateProjectMember from "./useCreateProjectMember";
import apiFetch from "./utils/apiFetch";
import { Database } from "../../lib/supabase/database.types";
import { supabase } from "../../lib/supabase";

type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];

const useCreateProject = () => {
  const {
    createProjectMember,
    loading: memberLoading,
    error: memberError,
  } = useCreateProjectMember();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async ({
    name,
    userId,
  }: {
    name: string;
    userId: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Insert the project into the database
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert<ProjectInsert>({ name })
        .select("id, name")
        .single();

      if (projectError || !projectData) {
        throw new Error(projectError.message || "Failed to create project.");
      }

      // Step 2: Generate the API key by calling the backend
      const apiKeyResponse = await apiFetch("api-keys/create", {
        method: "POST",
        body: { projectId: projectData.id }, // Associate the API key with the project
      });

      if (!apiKeyResponse?.apiKey) {
        throw new Error("Failed to generate API key.");
      }

      // Step 3: Add the user as the project owner
      const projectMemberData = await createProjectMember({
        user_id: userId,
        project_id: projectData.id,
        role: "owner",
      });

      if (!projectMemberData) {
        throw new Error("Failed to add project owner.");
      }

      return {
        project: projectData,
        projectMember: projectMemberData,
        apiKey: apiKeyResponse.apiKey,
      };
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    loading: loading || memberLoading,
    error: error || memberError,
  };
};

export default useCreateProject;
