// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
  }
}

type FormStatus = {
  pending: boolean;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      DATABASE_URL: string;
      DIRECT_URL: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    }
  }
}
