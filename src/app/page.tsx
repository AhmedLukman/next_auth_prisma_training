"use client";
import { Role } from "@/lib/contants";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  const isLoading = status === "loading";
  const isAdmin = data?.user.role === Role.Admin;

  const renderUserStatus = () => {
    if (isLoading) return <p>Loading...</p>;
    if (!data?.user)
      return (
        <p>
          Sign up to add and view posts. You can choose to get admin rights for
          free so be sure to check it out!
        </p>
      );
    if (isAdmin) return <p>You are an admin, enjoy the perks!</p>;
    return (
      <p>
        You are authenticated and can add and view posts. Gain admin rights by
        clicking on the &apos;Be Admin&apos; button on the navbar.
      </p>
    );
  };

  return (
    <main className="flex items-center mt-32 flex-col gap-5">
      <h2 className="text-3xl">Hello and welcome!</h2>
      <div className="text-center px-5 max-w-prose">
        <p>
          This project served as a valuable learning experience for me, where I
          explored and mastered the use of Next Auth v5 for authentication,
          together with prisma as an ORM to efficiently authenticate and store
          data in an online database.
        </p>
        <div className="mt-2">{renderUserStatus()}</div>
      </div>
    </main>
  );
}
