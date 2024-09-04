"use client"
import { CalculateAge } from "@/libs/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  member: Member;
};

const MemberSidebar = ({ member }: Props) => {
  const basePath = `/members/${member.userId}`;
  const pathName = usePathname();
  const navlinks = [
    { name: "Profile", href: `${basePath}` },
    { name: "Photos", href: `${basePath}/photos` },
    { name: "Chat", href: `${basePath}/chats` },
  ];
  return (
    <Card className="w-full items-center h-[calc(100vh-115px)]">
      <Image
        height={200}
        width={200}
        alt={member.name}
        src={member.image || "images/user.png"}
        className="rounded-full mt-6 object-cover aspect-square"
      />
      <CardBody>
        <div className="flex flex-col items-center">
          <div className="text-2xl">
            {member.name}, {CalculateAge(member.dateOfBirth)}
          </div>
          <div className="text-sm text-neutral-500">
            {member.city}, {member.country}
          </div>
        </div>
        <Divider className="my-3" />
        <nav className="flex flex-col p-4 text-2xl gap-3">
          {navlinks.map((navItem) => (
            <Link
              key={navItem.name}
              href={navItem.href}
              className={`block rounded ${
                pathName === navItem.href
                  ? "text-secondary"
                  : "hover:text-secondary/50"
              }`}
            >
              {navItem.name}
            </Link>
          ))}
        </nav>
      </CardBody>
      <CardFooter>
        <Button as={Link} fullWidth color="secondary" href="/members">
          Go Back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemberSidebar;
