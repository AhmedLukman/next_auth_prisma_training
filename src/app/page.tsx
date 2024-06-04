"use client";

import { Role } from "@/lib/contants";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const user = session.data?.user;
  const isLoading = session.status === "loading";
  const isAdmin = user?.role === Role.Admin;
  return (
    <main className="flex items-center mt-32 flex-col gap-5">
      <h2 className="text-3xl">Hello and welcome!</h2>
      <p className="max-w-prose text-center">
        This project served as a valuable learning experience for me, where I
        explored and mastered the use of Next Auth v5 for authentication,
        together with prisma as an ORM to efficiently authenticate and store
        data in an online database.
      </p>
      {isLoading && <p className="text-center">Loading...</p>}
      {!user && !isLoading && (
        <p>
          {" "}
          Sign up in order to add and view posts. You can choose to get admin
          rights for free so be sure to check it out!{" "}
        </p>
      )}
      {user && !isAdmin ? (
        <p>
          You are authenticated and can add and view posts, and gain admin
          rights as well by clicking on the be admin button on the navbar
        </p>
      ) : (
        <p>You are an admin, enjoy the perks!</p>
      )}
    </main>
  );
}
