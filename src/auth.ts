import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // theme: {
  //   logo: "/logo.svg",
  //   brandColor: "#000000",
  // }
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  trustHost: true
});
