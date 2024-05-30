import { auth } from "@/auth";
import PostCard from "@/components/ui/PostCard";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

const ViewPostsPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/api/auth/signin?callbackUrl=/posts");

  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <main>
      <h2 className="text-3xl text-center mt-20">Posts</h2>
      <section className="grid grid-cols-2 max-w-5xl mx-auto justify-center my-10 gap-5">
        {posts.length === 0 && <p>No posts added yet.</p>}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            content={post.content}
            title={post.title}
            author={post?.author.name || ""}
          />
        ))}
      </section>
    </main>
  );
};

export default ViewPostsPage;
