"use server";

import {
  memberEditSchema,
  MemberEditSchema,
} from "@/libs/schemas/memberEditSchema";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/libs/prisma";

export async function upDateMemberProfile(data: MemberEditSchema) {
  try {
    const userId = await getAuthUserId();
    const validated = memberEditSchema.safeParse(data);
    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, description, city, country } = validated.data;

    const member = await prisma.member.update({
      where: { userId },
      data: {
        name,
        description,
        city,
        country,
      },
    });

    return { status: "success", data: member };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}
