"use client"
import LikeButton from "@/components/LikeButton";
import { CalculateAge } from "@/libs/utils";
import { Card, CardBody, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  member: Member;
  likeIds: String[];
};

const MembarCard = ({ member, likeIds }: Props) => {
  const isLiked = likeIds.includes(member.userId);

  const preventHandler = (e:React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }
  return (
    <>
      <Card
        className="p-3"
        as={Link}
        href={`/members/${member.userId}`}
        isPressable
      >
        <Image
          alt={member.name}
          className="object-cover rounded-xl"
          src={member.image || "/images/user.png"}
          width={370}
          height={200}
        />
        <div onClick={preventHandler}>
          <div className="absolute top-4 right-4 z-10">
            <LikeButton targetId={member.userId} isLiked={isLiked} />
          </div>
        </div>

        <div className="flex pt-3 flex-col gap-1">
          <h4 className="font-medium text-base mb-0 text-black">
            {member.name},
            <span className="font-normal text-sm text-black/80">
              {CalculateAge(member.dateOfBirth)}
            </span>
          </h4>
          <p className="text-tiny uppercase font-bold mb-0">{member.country}</p>
          <small className="text-default-500">{member.city}</small>
        </div>
      </Card>
    </>
  );
};

export default MembarCard;
