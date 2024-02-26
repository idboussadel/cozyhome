"use client";
import React from "react";
import Image from "next/image";
import logo from "../../public/logo.svg";
import Search from "./Search";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-2 border-b-[1px] flex md:justify-around max-sm:px-4 max-md:px-12 max-sm:gap-4 max-md:gap-8 items-center">
        <Link href="/" className="max-md:hidden">
          <Image src={logo} height={34} alt="CozyHome logo" />
        </Link>
        <Search />
        <UserMenu currentUser={currentUser} />
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
