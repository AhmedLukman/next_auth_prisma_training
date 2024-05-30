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
import { Post, User } from "@prisma/client";

const PostCard = ({
  post: { title, content, id: postId, author: {name}, authorId },
  userId,
}: {
  post: {
    author: User;
  } & Post;
  userId: string;
}) => {
  const isUserTheAuthor = userId === authorId;
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
          isUserTheAuthor ? "justify-between" : "justify-end"
        }`}
      >
        {isUserTheAuthor && (
          <form action={deletePost.bind(null, postId, authorId)}>
            <SubmitButton color="danger">Delete</SubmitButton>
          </form>
        )}
        <p>@{name}</p>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
