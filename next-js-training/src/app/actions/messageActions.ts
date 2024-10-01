"use server";

import { messageSchema, MessageSchema } from "@/libs/schemas/messageSchema";
import { ActionResult } from "../types";
import { Message } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/libs/prisma";
import { mapMessageToMessageDto } from "@/libs/mapping";

export async function createMessage(
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<Message>> {
  try {
    const userId = await getAuthUserId();
    const validate = messageSchema.safeParse(data);
    if (!validate.success) {
      return { status: "error", error: validate.error.errors };
    }
    const { text } = validate.data;
    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientUserId,
        senderId: userId,
      },
    });
    return { status: "success", data: message };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: `something went wrong with the request ${error}`,
    };
  }
}

export async function getMessageThread(recipientUserId: string) {
  try {
    const userId = await getAuthUserId();
    const message = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId: recipientUserId,
          },
          {
            recipientId: userId,
            senderId: recipientUserId,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return message.map(message => mapMessageToMessageDto(message))

  } catch (error) {
    console.log(error);
    throw error;
  }
}
