import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Codepen } from "lucide-react";
import Link from "next/link";
import React from "react";
import Navlink from "./Navlink";

export default function Header() {
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-purple-400 to-purple-700"
      classNames={{
        item: [
          "data-[active=true]:text-yellow-300",
          "text-white",
          "uppercase"
        ]
      }}
    >
      <NavbarBrand as={Link} href="/">
        <Codepen color="white" />
        <p className="font-bold text-white text-inherit pl-1">NEXT MATCHES</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Navlink label="Members" href="/members" />
        <Navlink label="Lists" href="/lists" />
        <Navlink label="Messages" href="/messages" />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            color="primary"
            variant="bordered"
            href="/auth/login"
            className="bg-transparent text-white border-white"
          >
            Log In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="/auth/register"
            className="bg-white text-purple-500"
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
