"use client";

import { createMessage } from "@/app/actions/messageActions";
import { messageSchema, MessageSchema } from "@/libs/schemas/messageSchema";
import { handleFormServerErrors } from "@/libs/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
    setFocus,
    formState: { isSubmitting, isValid, errors },
  } = useForm<MessageSchema>({ resolver: zodResolver(messageSchema) });

  useEffect(() => {
    setFocus("text");
  }, [setFocus]);

  const onSubmitForm = async (data: MessageSchema) => {
    const result = await createMessage(params.userId, data);
    if (result.status === "error") {
      handleFormServerErrors(result, setError);
    } else {
      reset();
      router.refresh();
      setTimeout(() => {
        setFocus('text')
      }, 100);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="w-full py-2">
      <div className="flex gap-2 items-center">
        <Input
          fullWidth
          placeholder="Type a Message"
          variant="faded"
          {...register("text")}
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
          autoComplete="off"
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
