import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: User & DefaultSession["user"];
  }
}

// --- OR ---
// import { Session } from "next-auth";
// import { User as PrismaUser } from "@prisma/client";

// declare module "next-auth" {
//   interface Session {
//     user: PrismaUser;
//   }
// }
