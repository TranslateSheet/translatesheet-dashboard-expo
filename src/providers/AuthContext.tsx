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
    try {
      const redirectUri = `${window.location.origin}/dashboard/auth-callback`;
  
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: redirectUri,
          queryParams: { prompt: "login" },
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
    console.log("Setting up auth listener...");
  
    // Listen for auth changes and update session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Auth state changed: ${event}`);
  
      if (session) {
        console.log("New session:", session);
        setSession(session);
      } else {
        console.log("No active session, user signed out.");
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
