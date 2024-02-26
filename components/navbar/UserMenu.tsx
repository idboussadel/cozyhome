"use client";
import React, { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import MenuItems from "./MenuItems";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import useRentModal from "@/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handelToggle = () => {
    setIsOpen((value) => !value);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [loginModal, currentUser, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
        hidden
        md:block
        text-sm 
        font-semibold 
        py-3 
        px-4 
        rounded-full 
        hover:bg-neutral-100 
        transition 
        cursor-pointer
      "
        >
          Your CozyHome
        </div>
        <div
          onClick={handelToggle}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute w-[40vw] rounded-xl shadow-md md:w-3/4 bg-white text-sm top-12 right-0 overflow-hidden">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItems
                  onClick={() => {
                    router.push("/trips");
                    closeMenu();
                  }}
                  label="My Trips"
                />
                <MenuItems
                  onClick={() => {
                    router.push("/favorites");
                    closeMenu();
                  }}
                  label="My Favorites"
                />
                <MenuItems
                  onClick={() => {
                    router.push("/reservations");
                    closeMenu();
                  }}
                  label="My Reservations"
                />
                <MenuItems
                  onClick={() => {
                    router.push("/properties");
                    closeMenu();
                  }}
                  label="My Properties"
                />
                <MenuItems
                  onClick={() => {
                    rentModal.onOpen();
                    closeMenu();
                  }}
                  label="Your CozyHome"
                />
                <hr />
                <MenuItems onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItems
                  onClick={() => {
                    loginModal.onOpen();
                    closeMenu();
                  }}
                  label="Login"
                />
                <MenuItems
                  onClick={() => {
                    registerModal.onOpen();
                    closeMenu();
                  }}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
