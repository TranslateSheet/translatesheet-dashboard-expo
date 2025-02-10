import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useGlobalSearchParams } from "expo-router";
// If you generated types from your DB, import them here
// import { Database } from "../../lib/supabase/database.types";

// Example TypeScript definitions (adjust for your schema)
// type ProjectMemberRow = Database["public"]["Tables"]["project_members"]["Row"];
// type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Example shape of combined project_members + profile data
 */
export interface ProjectMemberProfile {
  id: string; // project_members.id
  role: string | null; // e.g. "owner" | "admin" | "editor"...
  user_id: string; // The Supabase user ID
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
    email: string | null;
    // ... other fields from the "profiles" table
  };
}

export function useGetProjectMembers() {
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();
  return useQuery<ProjectMemberProfile[]>({
    queryKey: ["projectMembers", projectId],
    queryFn: async () => {
      if (!projectId) return [];

      // SELECT from "project_members" and JOIN with the "profiles" table
      // Using Supabase's relationship syntax or an explicit join
      const { data, error } = await supabase
        .from("project_members")
        .select(
          `
          id,
          role,
          user_id,
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

      // Transform the data if you want a cleaner shape
      const members: ProjectMemberProfile[] =
        data?.map((row: any) => ({
          id: row.id,
          role: row.role,
          user_id: row.user_id,
          profile: row.profiles
            ? {
                full_name: row.profiles.full_name,
                avatar_url: row.profiles.avatar_url,
                email: row.profiles.email,
              }
            : undefined,
        })) || [];

      return members;
    },
    enabled: !!projectId,
  });
}
