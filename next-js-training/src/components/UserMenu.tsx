"use client";

import { SignOutUser } from "@/app/actions/authActions";
import { signOut } from "@/auth";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

type Props = {
  user: Session["user"];
};

const UserMenu = ({ user }: Props) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user?.name || "user"}
          size="sm"
          src={user?.image || "images/user.png"}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User Actions Menu">
        <DropdownSection>
          <DropdownItem
            isReadOnly
            as="span"
            className="flex h-14 flex-row font-medium"
            aria-label="username"
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.name}</p>
          </DropdownItem>
          <DropdownItem as={Link} href="/members/edit">
            Edit Profile
          </DropdownItem>
          <DropdownItem
            startContent
            color="danger"
            onClick={async () => SignOutUser()}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
