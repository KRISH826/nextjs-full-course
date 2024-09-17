"use client";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React from "react";
import { HiPhoto } from "react-icons/hi2";

type Props = {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
};

const ImageUpload = ({ onUploadImage }: Props) => {
  return (
    <>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={onUploadImage}
        signatureEndpoint="/api/sign-image"
        uploadPreset="frankdev"
        className={`flex items-center gap-2 border-2 border-secondary text-secondary 
        rounded-lg py-2 px-3 hover:bg-secondary/10`}
      >
        <HiPhoto size={24} />
        <span className="text-sm">Upload new image</span>
      </CldUploadButton>
    </>
  );
};

export default ImageUpload;
