import { cachedAuth } from "@/lib/util";
import AddPostForm from "@/components/ui/AddPostForm";
import { redirect } from "next/navigation";
import React from "react";

const AddPostPage = async () => {
  const session = await cachedAuth();
  const user = session?.user;
  if (!user) redirect("/api/auth/signin?callbackUrl=/posts/add");
  return (
    <main>
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl mt-14 mb-8">Add a new post</h1>
        <AddPostForm />
      </div>
    </main>
  );
};

export default AddPostPage;
