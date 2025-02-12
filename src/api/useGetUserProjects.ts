import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useSession } from "@/providers/AuthContext";
import { ProjectsRow } from "./types";

const fetchUserProjects = async (userId: string) => {
  const { data, error } = await supabase
    .from("project_members")
    .select(
      `
      projects (id, name, created_at, updated_at, primary_language)
    `
    )
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data?.map((entry) => entry.projects) || [];
};

const useGetUserProjects = () => {
  const { session } = useSession();
  const userId = session?.user?.id;

  return useQuery<ProjectsRow[], Error>({
    queryKey: ["userProjects", userId],
    queryFn: () => fetchUserProjects(userId!),
    enabled: !!userId,
  });
};

export default useGetUserProjects;
