"use client"

import { addImage } from '@/app/actions/userActions'
import ImageUpload from '@/components/ImageUpload'
import { CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const MemberPhotoUpload = () => {
    const router = useRouter();

    const onAddImage = async(result: CloudinaryUploadWidgetResults) => {
        if(result.info && typeof result.info === 'object') {
            await addImage(result.info.secure_url, result.info.public_id);
            router.refresh();
        }else {
            toast.error("Problem with uploaded image");
        }
    }
  return (
    <>
    <ImageUpload onUploadImage={onAddImage} />
    </>
  )
}

export default MemberPhotoUpload