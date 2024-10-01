import { CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";

const chatPage = async ({params}: {params : {userId: string}}) => {
  const message = await getMessageThread(params.userId);
  console.log(message)
  return (
    <>
      <CardHeader>
        <h2 className="text-2xl font-semibold text-secondary">Chats</h2>
      </CardHeader>
      <Divider />
      <CardBody>CHATS</CardBody>
      <CardFooter>
        <ChatForm />
      </CardFooter>
    </>
  );
};

export default chatPage;
