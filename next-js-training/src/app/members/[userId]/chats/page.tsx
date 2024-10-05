import { CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import MessageBox from "./MessageBox";

const chatPage = async ({ params }: { params: { userId: string } }) => {
  const messages = await getMessageThread(params.userId);

  return (
    <>
      <CardHeader>
        <h2 className="text-2xl font-semibold text-secondary">Chats</h2>
      </CardHeader>
      <Divider />
      <CardBody className="my-2">
        {messages.length === 0 ? (
          "No messages available"
        ) : (
          <>
            {messages.map((message) => (
              <>
                <MessageBox
                  currentUserId={params.userId}
                  message={message}
                  key={message.id}
                />
              </>
            ))}
          </>
        )}
      </CardBody>
      <CardFooter>
        <ChatForm />
      </CardFooter>
    </>
  );
};

export default chatPage;
