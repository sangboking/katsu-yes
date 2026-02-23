import { supabase } from "@/lib/supabase/client";

const loginWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
};

export default loginWithGoogle;
