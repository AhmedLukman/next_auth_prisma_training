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

  if (content.trim().length === 0 || !content){
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

  revalidatePath("/posts")
  redirect("/posts");


};