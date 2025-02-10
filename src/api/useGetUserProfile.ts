import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { UserProfileRow } from "./types";

const useGetUserProfile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfileRow | null>(null);

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
