import { Prisma } from "@prisma/client";
import { ZodIssue } from "zod";

type ActionResult<T> = {status: 'success', data: T | string} | {status: 'error', error:string | ZodIssue[]};
type MessageWithSenderReciepent = Prisma.MessageGetPayload<{
    select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
            select: {userId, name, image}
        },
        recipient: {
            select: {userId, name, image}
        }
    }
}>

type MessageDto = {
    id: string;
    text: string;
    created: string;
    dateRead?: string | null;
    senderName?: string;
    senderId?: string;
    senderImage?: string | null;
    recipientName?: string;
    recipientId?: string;
    recipientImage?: string | null;
}