import { getMemberUserById } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React from "react";

const MemBerDetailsPage = async ({
  params,
}: {
  params: { userId: string };
}) => {
  const memberDetails = await getMemberUserById(params.userId);
  if (!memberDetails) return notFound();
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{memberDetails.description}</p>
      </CardBody>
    </>
  );
};

export default MemBerDetailsPage;
