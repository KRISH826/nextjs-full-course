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
  if (!member) return notFound();
  const basePath = `/members/${member.userId}`;
  const navlinks = [
    { name: "Profile", href: `${basePath}` },
    { name: "Photos", href: `${basePath}/photos` },
    { name: "Chat", href: `${basePath}/chats` },
  ];
  return (
    <>
      <div className="grid grid-cols-12 gap-5 h-[calc(100vh-115px)]">
        <div className="col-span-3">
          <MemberSidebar member={member} navlinks={navlinks} />
        </div>
        <div className="col-span-9">
          <Card className="w-full h-[calc(100vh-115px)]">{children}</Card>
        </div>
      </div>
    </>
  );
};

export default Layout;
