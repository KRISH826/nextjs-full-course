import { getMemberUserById } from "@/app/actions/memberActions";
import React, { ReactNode } from "react";
import MemberSidebar from "../MemberSidebar";
import { notFound } from "next/navigation";
import { Card } from "@nextui-org/react";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { userId: string };
}) => {
  const member = await getMemberUserById(params.userId);
  if (!member) return notFound()
  return (
    <>
    <div className="grid grid-cols-12 gap-5 h-[85vh]">
        <div className="col-span-3">
            <MemberSidebar member={member} />
        </div>
        <div className="col-span-9">
            <Card className="w-full h-[85vh]">
                {children}
            </Card>
        </div>
    </div>
    </>
  );
};

export default Layout;
