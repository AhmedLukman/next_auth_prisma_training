"use server";

import { auth } from "@/auth";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { initialAddPostFormState } from "@/components/ui/AddPostForm";

export const addPost = async (
  prevState: { titleError: string; contentError: string; dbError: string },
  formData: FormData
) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return {
      ...initialAddPostFormState,
      dbError: "You must be logged in to add a post",
    };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (title.trim().length === 0 || !title) {
    return {
      ...initialAddPostFormState,
      titleError: "Title is required",
    };
  }

  if (content.trim().length === 0 || !content) {
    return {
      ...initialAddPostFormState,
      contentError: "Content is required",
    };
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      ...initialAddPostFormState,
      dbError: "Failed to add post",
    };
  }

  revalidatePath("/posts");
  redirect("/posts");
};

export const deletePost = async (id: string, authorId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) throw new Error("You must be logged in to delete a post");
  if(user.id !== authorId) throw new Error("You must be the author of the post to delete it");
  
  try {
    await prisma.post.delete({
      where: {
        id
      },
    });
  } catch (error) {
    throw new Error("Failed to delete post");
  }

  revalidatePath("/posts");
};
