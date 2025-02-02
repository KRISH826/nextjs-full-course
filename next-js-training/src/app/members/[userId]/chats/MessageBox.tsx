"use client"
import { MessageDto } from "@/app/types";
import { transformImageUrl } from "@/libs/utils";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";

type Props = {
  message: MessageDto;
  currentUserId: string;
};

const MessageBox = ({ message, currentUserId }: Props) => {
  const isCurrentUserSender = message.senderId === currentUserId;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(messageEndRef.current) messageEndRef.current.scrollIntoView({behavior: 'smooth'})
  }, [messageEndRef])
  

  const messageContentClasses = clsx("flex flex-col min-w-[30%] max-w-[50%] px-2 py-1", {
    "rounded-l-xl rounded-tr-xl text-white bg-blue-100": isCurrentUserSender,
    "rounded-r-xl rounded-tl-xl border-gray-200 bg-green-100":
      !isCurrentUserSender,
  });

  const renderMessageHeader = () => {
    return (
      <div className={clsx('flex items-center w-full', {
        'justify-between' : isCurrentUserSender
      })}>
        {message.dateRead && message.recipientId == currentUserId && (
          <span className="text-xs text-black italic">Read 4 mins ago</span>
        )}
        <div className="flex">
          <span className="text-sm font-semibold text-gray-900">{message.senderName}</span>
          <span className="text-sm text-gray-500 ml-2">{message.created}</span>
        </div>
      </div>
    )
  }

  const renderMessageContent = () => {
    return (
      <div className={messageContentClasses}>
        {renderMessageHeader()}
        <p className="text-sm py-2 text-gray-900">{message.text}</p>
      </div>
    );
  };

  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx("flex gap-2 mb-3", {
          "justify-end text-right": isCurrentUserSender,
          "justify-start": !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && (
          <Avatar
            name={message.senderName}
            className="self-end"
            src={transformImageUrl(message.senderImage) || "images/user.png"}
          />
        )}
        {renderMessageContent()}
        {isCurrentUserSender && (
          <Avatar
            name={message.senderName}
            className="self-end"
            src={transformImageUrl(message.senderImage) || "images/user.png"}
          />
        )}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageBox;
