"use client"
import { Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import React from "react";

type Props = {
  photo: Photo | null;
};

const MemberImage = ({ photo }: Props) => {
  return (
    <div>
      {photo?.publicId ? (
        <>
          <CldImage
            alt="image of member"
            src={photo.publicId}
            width={300}
            height={200}
            crop="fill"
            className="rounded-2xl h-[220px] object-cover"
            priority
          />
        </>
      ) : (
        <>
          <Image
            width={300}
            height={220}
            src={photo?.url}
            alt="image of user"
            className="object-cover aspect-square"
          />
        </>
      )}
    </div>
  );
};

export default MemberImage;
