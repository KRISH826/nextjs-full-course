"use client";

import { messageSchema, MessageSchema } from "@/libs/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

const ChatForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<MessageSchema>({ resolver: zodResolver(messageSchema) });

  const onSubmitForm = (data: MessageSchema) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="w-full flex gap-2 items-center "
    >
      <Input
        fullWidth
        placeholder="Type a Message"
        variant="faded"
        {...register("text")}
        isInvalid={!!errors.text}
        errorMessage={errors.text?.message}
      />
      <Button
        isIconOnly
        color="secondary"
        radius="full"
        isLoading={isSubmitting}
        isDisabled={!isValid || isSubmitting}
      >
        <HiPaperAirplane size={18} />
      </Button>
    </form>
  );
};

export default ChatForm;
