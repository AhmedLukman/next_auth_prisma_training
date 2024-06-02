"use client";

import { Post, User as dbUser } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PostCard from "../ui/PostCard";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { User } from "next-auth";

const ViewPostsPage = ({
  posts,
  user,
}: {
  posts: ({
    author: dbUser;
  } & Post)[];
  user: User;
}) => {
  const [value, setValue] = useState<Selection>(new Set(["all"]));
  const [mutatingPosts, setMutatingPosts] = useState(posts);

  const userId = user.id;

  useEffect(() => {
    if (Array.from(value).at(0) === "my") {
      setMutatingPosts((prevState) =>
        prevState.filter((post) => post.author.id === userId)
      );
    } else {
      setMutatingPosts(posts);
    }
  }, [value, posts, userId]);

  return (
    <main>
      <div className="flex gap-5 justify-center items-center mt-20">
        <Select
          disallowEmptySelection
          onSelectionChange={setValue}
          selectedKeys={value}
          className="max-w-20"
          color="secondary"
        >
          <SelectItem key="all">All</SelectItem>
          <SelectItem key="my">My</SelectItem>
        </Select>
        <h2 className="text-3xl">Posts</h2>
      </div>
      <section className="grid grid-cols-2 max-w-5xl mx-auto justify-center my-10 gap-5">
        {mutatingPosts.length === 0 && <p>No posts added yet.</p>}
        {mutatingPosts.map((post) => {
          return <PostCard key={post.id} post={post} user={user} />;
        })}
      </section>
    </main>
  );
};

export default ViewPostsPage;
