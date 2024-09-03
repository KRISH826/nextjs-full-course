import { getMemberUserById } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import React from "react";

const MemBerDetailsPage = async ({
  params,
}: {
  params: { userId: string };
}) => {
  const memberDetails = await getMemberUserById(params.userId);
  if(!memberDetails) return notFound();
  return <div>{memberDetails?.name}</div>;
};

export default MemBerDetailsPage;
