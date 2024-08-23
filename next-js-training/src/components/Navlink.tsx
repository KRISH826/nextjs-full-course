"use client"

import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkProps = {
  href: string;
  label: string;
};

export default function Navlink({ href, label }: NavLinkProps) {
  const pathName = usePathname();
  return (
    <NavbarItem isActive={pathName === href } as={Link} href={href} className="text-white">
      {label}
    </NavbarItem>
  );
}
