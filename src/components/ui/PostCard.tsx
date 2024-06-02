import { deletePost } from "@/lib/actions";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  cn,
} from "@nextui-org/react";
import React from "react";
import SubmitButton from "./SubmitButton";
import { Post, User as dbUser } from "@prisma/client";
import { User } from "next-auth";

const PostCard = ({
  post: {
    title,
    content,
    id: postId,
    author: { name },
    authorId,
  },
  user,
}: {
  post: {
    author: dbUser;
  } & Post;
  user: User;
}) => {
  const isUserTheAuthor = user.id === authorId;
  const isAdmin = user.role === "ADMIN";

  const formAction = async () => {
    try {
      const boundDeletePost = deletePost.bind(null, postId, user, authorId);
      await boundDeletePost();
      alert("Post deleted successfully")
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <Card className="min-h-72">
      <CardHeader className="flex gap-3 text-lg font-bold">{title}</CardHeader>
      <Divider />
      <CardBody>
        <p>{content}</p>
      </CardBody>
      <Divider />
      <CardFooter
        className={`flex ${
          isUserTheAuthor || isAdmin ? "justify-between" : "justify-end"
        }`}
      >
        {(isUserTheAuthor || isAdmin) && (
          <form action={formAction}>
            <SubmitButton color="danger">Delete</SubmitButton>
          </form>
        )}
        <p>@{name}</p>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
