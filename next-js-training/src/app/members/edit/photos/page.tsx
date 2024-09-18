import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberPhotosByUserId, getMemberUserById } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import React from "react";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberPhotos from "@/components/MemberPhotos";

const UploadPhotos = async () => {
  const userId = await getAuthUserId();
  const photos = await getMemberPhotosByUserId(userId);
  const member = await getMemberUserById(userId);
  return (
    <>
      <CardHeader className="flex items-center gap-2 flex-wrap justify-between">
        <h3 className="text-2xl font-semibold text-secondary">Photos</h3>
        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotos photos={photos} isEditing={true} mainImageUrl={member?.image}  />
      </CardBody>
    </>
  );
};

export default UploadPhotos;
