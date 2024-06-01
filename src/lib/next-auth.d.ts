import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: string | null;
  }
  interface Session {
    user: User & DefaultSession["user"];
  }
}
