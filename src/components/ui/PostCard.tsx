import { deletePost } from "@/lib/actions";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";
import SubmitButton from "./SubmitButton";

const PostCard = ({
  title,
  content,
  author,
  id,
}: {
  id: string;
  title: string;
  content: string;
  author: string;
}) => {
  return (
    <Card className="min-h-72">
      <CardHeader className="flex gap-3 text-lg font-bold">{title}</CardHeader>
      <Divider />
      <CardBody>
        <p>{content}</p>
      </CardBody>
      <Divider />
      <CardFooter className=" flex justify-between">
        <form action={deletePost.bind(null, id)}>
          <SubmitButton color="danger">Delete</SubmitButton>
        </form>
        <p>@{author}</p>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
