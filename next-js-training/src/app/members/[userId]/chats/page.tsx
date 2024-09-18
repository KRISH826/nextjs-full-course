import { CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import ChatForm from "./ChatForm";

const chatPage = () => {
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
