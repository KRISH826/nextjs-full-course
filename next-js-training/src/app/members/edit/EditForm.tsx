"use client";

import { upDateMemberProfile } from "@/app/actions/userActions";
import {
  memberEditSchema,
  MemberEditSchema,
} from "@/libs/schemas/memberEditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  member: Member;
};

const EditForm = ({ member }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  const onSubmit = async (data: MemberEditSchema) => {
    const nameUpdated = data.name !== member.name;
    const result = await upDateMemberProfile(data,nameUpdated);

    if (result.status === "success") {
      toast.success("Profile Update Successfully");
      router.refresh();
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e) => {
          const fieldName = e.path.join(".") as
            | "description"
            | "name"
            | "city"
            | "country";
          setError(fieldName, { message: e.message });
        });
      } else {
        setError("root.serverError", { message: result.error });
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Input
            label="Name"
            defaultValue={member.name}
            type="text"
            variant="bordered"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message as string}
            {...register("name")}
          />
          <Textarea
            label="Description"
            defaultValue={member.description}
            variant="bordered"
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message as string}
            {...register("description")}
            minRows={6}
          />
          <div className="grid grid-cols-2 gap-5">
            <Input
              label="City"
              defaultValue={member.city}
              type="text"
              variant="bordered"
              isInvalid={!!errors.city}
              errorMessage={errors.city?.message as string}
              {...register("city")}
            />
            <Input
              label="Country"
              defaultValue={member.country}
              type="text"
              variant="bordered"
              isInvalid={!!errors.country}
              errorMessage={errors.country?.message as string}
              {...register("country")}
            />
          </div>
          {errors.root?.serverError && (
            <p className="text-danger text-sm">
              {errors.root.serverError.message}
            </p>
          )}
          <Button
            type="submit"
            className="flex justify-end"
            color="secondary"
            variant="solid"
            isDisabled={!isDirty || !isValid}
            isLoading={isSubmitting}
          >
            Update Profile
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditForm;
