"use client";

import { createMessage } from "@/app/actions/messageActions";
import { messageSchema, MessageSchema } from "@/libs/schemas/messageSchema";
import { handleFormServerErrors } from "@/libs/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

const ChatForm = () => {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<MessageSchema>({ resolver: zodResolver(messageSchema) });

  const onSubmitForm = async (data: MessageSchema) => {
    const result = await createMessage(params.userId, data);
    if (result.status === "error") {
      handleFormServerErrors(result, setError);
    } else {
      reset();
      router.refresh();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="w-full ">
      <div className="flex gap-2 items-center">
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
      </div>
      <div className="flex flex-col">
        {errors.root?.serverError && (
          <p className="text-danger text-sm">
            {errors.root.serverError.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default ChatForm;
