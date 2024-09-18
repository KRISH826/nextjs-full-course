"use client";

import { Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import StarButton from "./StarButton";
import DeleteButton from "./DeleteButton";
import MemberImage from "./MemberImage";
import { deleteImage, setMainImage } from "@/app/actions/userActions";
import { toast } from "react-toastify";

type Props = {
  photos: Photo[] | null | undefined;
  isEditing: boolean;
  mainImageUrl: string | null | undefined;
};

const MemberPhotos = ({ photos, isEditing, mainImageUrl }: Props) => {
  const router = useRouter();
  const [loading, setloading] = useState({
    type: "",
    isLoading: false,
    id: "",
  });

  const onSetMain = async (photo: Photo) => {
    try {
      if (photo.url === mainImageUrl) return null;
      setloading({ isLoading: true, id: photo.id, type: "main" });
      await setMainImage(photo);
      toast.success("Profile Picture Updated Successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setloading({ isLoading: false, id: "", type: "" });
    }
  };

  const onDeleteImage = async (photo: Photo) => {
    try {
      if (photo.url === mainImageUrl) return null;
      setloading({ isLoading: true, id: photo.id, type: "delete" });
      await deleteImage(photo);
      toast.success("Image Delete Successfully");
      router.refresh();
    } catch (error) {
      toast.error(`Delete Image Failed ${error}`);
    } finally {
      setloading({ isLoading: false, id: "", type: "" });
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-3">
        {photos &&
          photos?.map((photo) => (
            <div key={photo.id} className="relative group">
              <MemberImage photo={photo} />
              {isEditing && (
                <>
                  <div
                    onClick={() => onSetMain(photo)}
                    className="absolute top-3 left-3 z-50 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <StarButton
                      selected={photo.url === mainImageUrl}
                      loading={
                        loading.isLoading &&
                        loading.type === "main" &&
                        loading.id === photo.id
                      }
                    />
                  </div>
                  <div
                    onClick={() => onDeleteImage(photo)}
                    className="absolute top-3 right-3 z-50 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <DeleteButton
                      loading={
                        loading.isLoading &&
                        loading.type === "delete" &&
                        loading.id === photo.id
                      }
                    />
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default MemberPhotos;
