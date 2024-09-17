import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import DeleteButton from "@/components/DeleteButton";
import StarButton from "@/components/StarButton";
import { CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import React from "react";
import MemberPhotoUpload from "./MemberPhotoUpload";

const UploadPhotos = async () => {
  const userId = await getAuthUserId();
  const photos = await getMemberPhotosByUserId(userId);
  return (
    <>
      <CardHeader className="flex items-center gap-2 flex-wrap justify-between">
        <h3 className="text-2xl font-semibold text-secondary">Photos</h3>
        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3">
          {photos &&
            photos?.map((photo) => (
              <div key={photo.id} className="relative group">
                <Image
                  width={300}
                  height={250}
                  src={photo.url}
                  alt="image of user"
                  className="object-cover aspect-square"
                />
                <div className="absolute top-3 left-3 z-50 opacity-0 group-hover:opacity-100 transition-all">
                  <StarButton selected={false} loading={false} />
                </div>
                <div className="absolute top-3 right-3 z-50 opacity-0 group-hover:opacity-100 transition-all">
                  <DeleteButton loading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
};

export default UploadPhotos;
