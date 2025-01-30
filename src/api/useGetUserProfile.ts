import { useEffect, useState } from "react";
import { Database } from "../../lib/supabase/database.types";
import { supabase } from "../../lib/supabase";

type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];

const useGetUserProfile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      setUserProfile(data);
    };
    getUserProfile();
  }, [user]);

  return userProfile;
};

export default useGetUserProfile;
function useAuth(): { user: any } {
  throw new Error("Function not implemented.");
}
