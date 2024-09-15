import { getMemberUserById } from "@/app/actions/memberActions";
import React, { ReactNode } from "react";
import MemberSidebar from "../MemberSidebar";
import { notFound } from "next/navigation";
import { Card } from "@nextui-org/react";
import { getAuthUserId } from "@/app/actions/authActions";

const Layout = async ({ children }: { children: ReactNode }) => {
  const userId = await getAuthUserId();
  const member = await getMemberUserById(userId);
  if (!member) return notFound();

  const navlinks = [
    {
      name: "Edit Profile",
      href: "/members/edit",
    },
    {
      name: "Upload Photos",
      href: "/members/uploadPhoto",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-12 gap-5 h-[calc(100vh-115px)]">
        <div className="col-span-3">
          <MemberSidebar member={member} navlinks={navlinks}  />
        </div>
        <div className="col-span-9">
          <Card className="w-full h-[calc(100vh-115px)]">{children}</Card>
        </div>
      </div>
    </>
  );
};

export default Layout;
