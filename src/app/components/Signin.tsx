"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function SignInButton() {
  const { data: session } = useSession();
  return session?.user?.name ? (
    <button
      className="w-full text-start pt-2 border-t-2 border-t-black-500/50 hover:border-0"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  ) : (
    <button
      className="w-full text-start pt-2 border-t-2 border-t-black-500/50 hover:border-0"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}

