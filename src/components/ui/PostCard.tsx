import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";

const PostCard = ({title, content, author}: {title: string; content: string; author: string}) => {
  return (
    <Card className="min-h-72">
      <CardHeader className="flex gap-3 text-lg font-bold">{title}</CardHeader>
      <Divider />
      <CardBody>
        <p>{content}</p>
      </CardBody>
      <Divider />
      <CardFooter className=" flex justify-end">
        <p>@{author}</p>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
