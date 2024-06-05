"use server";

import { auth } from "@/auth";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { initialAddPostFormState } from "@/components/ui/AddPostForm";
import { User } from "next-auth";
import { Role, User as dbUser } from "@prisma/client";

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

export const deletePost = async (id: string, user: User, authorId: string) => {
  if (!user) throw new Error("You must be logged in to delete a post");
  if (user.role !== Role.ADMIN && user.id !== authorId)
    throw new Error("You must be the author of the post to delete it");

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete post");
  }

  revalidatePath("/posts");
};

export const updateProfile = async ({
  newUsername,
  user,
  userRecord,
}: {
  newUsername: string;
  user: User;
  userRecord: dbUser;
}) => {
  const isViewerTheUser = user?.id === userRecord.id;
  const isViewerTheUserORAdmin = isViewerTheUser || user.role === Role.ADMIN;

  if (!user) throw new Error("You must be logged in to update your profile");

  if (!isViewerTheUserORAdmin)
    throw new Error("You are not authorized to edit this user");

  if (newUsername.trim().length === 0 || !newUsername)
    throw new Error(
      JSON.stringify({ field: "username", message: "Username is invalid" })
    );

  try {
    await prisma.user.update({
      where: {
        id: userRecord.id,
      },
      data: {
        name: newUsername,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error(
        JSON.stringify({
          field: "db",
          message: "Failed to update profile" + error.message,
        })
      );
  }

  revalidatePath(`/user/${user.id}`);
};

export const deleteUser = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) throw new Error("You must be logged in to delete a user");
  if (user.id === id) throw new Error("You cannot delete yourself");

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to delete user" + error.message);
  }

  revalidatePath("/users");
};

export const beAdmin = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) throw new Error("You must be logged in to make yourself an admin");

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: Role.ADMIN,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to make user an admin" + error.message);
  }

  revalidatePath("/", "layout");
};
