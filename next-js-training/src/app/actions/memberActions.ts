"use server"

import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function getMembers() {
    const session = await auth();
    if(!session?.user) return null;
    try {
        return prisma.member.findMany({
            where: {
                NOT: {
                    userId: session.user.id
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function getMemberUserById(userId: string) {
    try {
        return prisma.member.findUnique({
            where: {userId}
        })
    } catch (error) {
        console.log(error)
    }
}