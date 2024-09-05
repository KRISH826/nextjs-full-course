"use server";

import { prisma } from "@/libs/prisma";
import { getAuthUserId } from "./authActions";

export async function toggleLikeMember(targetUserId: string, isliked: boolean) {
  try {
    const UserId = await getAuthUserId();
    if (isliked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: UserId,
            targetUserId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: UserId,
          targetUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchCurrentLikeId() {
  try {
    const UserId = await getAuthUserId();
    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: UserId,
      },
      select: { targetUserId: true },
    });

    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchMemberLike(type = "source") {
  try {
    const userId = await getAuthUserId();
    switch (type) {
      case "source":
        return await fetchSourceLikes(userId);
      case "target":
        return await fetchTargetLikes(userId);
      case "mutual":
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
  }
}
async function fetchSourceLikes(userId: string) {
  const sourceList = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetMember: true },
  });

  return sourceList.map((x) => x.targetMember);
}

async function fetchTargetLikes(userId: string) {
  const targetList = await prisma.like.findMany({
    where: { targetUserId: userId },
    select: { sourceMember: true },
  });

  return targetList.map((x) => x.sourceMember);
}

async function fetchMutualLikes(userId: string) {
  const likedUsers = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });

  const likedIds = likedUsers.map((x) => x.targetUserId);

  const mutualList = await prisma.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: { sourceMember: true },
  });

  return mutualList.map((x) => x.sourceMember);
}
