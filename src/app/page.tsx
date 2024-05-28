import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <main className="flex items-center mt-32 flex-col gap-5">
      <h2 className="text-3xl">Hello and welcome!</h2>
      <p className="max-w-prose text-center">
        This project served as a valuable learning experience for me, where I
        explored and mastered the use of Next Auth v5 for authentication,
        together with prisma as an ORM to efficiently authenticate and store
        data in an online database.
      </p>
      {!user && <p> Sign up in order to add and view posts.</p>}
      {user && <p>You are authenticated and can add and view posts.</p>}
    </main>
  );
}
