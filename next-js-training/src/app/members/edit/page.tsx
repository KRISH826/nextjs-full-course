import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import EditForm from "./EditForm";
import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberUserById } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";

const MemberEditPage = async() => {
  const userId = await getAuthUserId();
  const member = await getMemberUserById(userId);

  if(!member) return notFound();

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">Edit Profile</CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </>
  );
};

export default MemberEditPage;
