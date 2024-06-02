import { auth } from "@/auth";
import ViewPostsPage from "@/components/page/ViewPostsPage";
import PostCard from "@/components/ui/PostCard";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

const ViewPostsFetchPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/api/auth/signin?callbackUrl=/posts");

  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
   <ViewPostsPage posts={posts} user = {user}/>
  );
};

export default ViewPostsFetchPage;
