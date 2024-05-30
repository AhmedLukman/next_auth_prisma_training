"use client";

import { Post, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PostCard from "../ui/PostCard";
import { Select, SelectItem, Selection } from "@nextui-org/react";

const ViewPostsPage = ({
  posts,
  userId,
}: {
  posts: ({
    author: User;
  } & Post)[];
  userId: string;
}) => {
  const [value, setValue] = useState<Selection>(new Set(["all"]));

  const [mutatingPosts, setMutatingPosts] = useState(posts);

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
          onSelectionChange={setValue}
          selectedKeys={value}
          className="max-w-20"
        >
          <SelectItem key="all">All</SelectItem>
          <SelectItem key="my">My</SelectItem>
        </Select>
        <h2 className="text-3xl">Posts</h2>
      </div>
      <section className="grid grid-cols-2 max-w-5xl mx-auto justify-center my-10 gap-5">
        {mutatingPosts.length === 0 && <p>No posts added yet.</p>}
        {mutatingPosts.map((post) => (
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