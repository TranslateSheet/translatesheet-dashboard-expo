import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useGlobalSearchParams } from "expo-router";

export interface ProjectMemberProfile {
  id: string; // project_members.id
  role: string | null; // e.g. "owner" | "admin" | "editor"...
  user_id: string | null; // The Supabase user ID (nullable if not yet registered)
  invited_email?: string | null; // Email used for the invitation
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
    email: string | null;
  };
}

export function useGetProjectMembers() {
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();
  return useQuery<ProjectMemberProfile[]>({
    queryKey: ["projectMembers", projectId],
    queryFn: async () => {
      if (!projectId) return [];

      // Fetch from project_members joining profiles and including invited_email
      const { data, error } = await supabase
        .from("project_members")
        .select(
          `
          id,
          role,
          user_id,
          invited_email,
          profiles (
            full_name,
            avatar_url,
            email
          )
        `
        )
        .eq("project_id", projectId);

      if (error) {
        console.error("Error fetching project members:", error);
        throw new Error(error.message);
      }

      // Transform the data so that invited members (with no profile) still show an email
      const members: ProjectMemberProfile[] =
        data?.map((row: any) => ({
          id: row.id,
          role: row.role,
          user_id: row.user_id,
          invited_email: row.invited_email,
          profile: row.profiles
            ? {
                full_name: row.profiles.full_name,
                avatar_url: row.profiles.avatar_url,
                email: row.profiles.email,
              }
            : row.invited_email
            ? { email: row.invited_email, full_name: null, avatar_url: null }
            : undefined,
        })) || [];

      return members;
    },
    enabled: !!projectId,
  });
}
