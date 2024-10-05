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
            senderDeleted: false,
          },
          {
            recipientId: userId,
            senderId: recipientUserId,
            recieptDeleted: false
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
    if (message.length > 0) {
      await prisma.message.updateMany({
        where: {
          senderId: recipientUserId,
          recipientId: userId,
          dateRead: null,
        },
        data: {
          dateRead: new Date(),
        },
      });
    }
    return message.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMessageByContainer(container: string) {
  try {
    const userId = await getAuthUserId();

    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recieptDeleted: false }),
    };
    const messages = await prisma.message.findMany({
      where: conditions,
      orderBy: {
        created: "desc",
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

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
  const selector = isOutbox ? "senderDeleted" : "recieptDeleted";
  try {
    const userId = await getAuthUserId();
    await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        [selector]: true,
      },
    });

    const messageToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recieptDeleted: true,
          },
          {
            recipientId: userId,
            recieptDeleted: true,
            senderDeleted: true,
          },
        ],
      },
    });

    if (messageToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messageToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
