import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
} from "react";
import { useStorageState } from "@/hooks/useStorageState";

import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";

const AuthContext = createContext<{
  signIn: () => Promise<void>;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState<Session | null>(
    "session"
  );

  const signIn = async () => {
    console.log(process.env.NODE_ENV);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          queryParams: {
            prompt: "login",
          }
        },
      });

      if (error) throw error;
      console.log("Redirecting to GitHub...");
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  // Sign out and clear the session
  const signOut = () => {
    supabase.auth.signOut().then(() => setSession(null));
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setSession(session); // Store the full session object
      } else if (event === "SIGNED_OUT") {
        setSession(null);
      }
    });

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
