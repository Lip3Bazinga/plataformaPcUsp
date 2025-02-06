"use client";

import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import Logo from "../../public/assets/logo_dark.png"; // Verifique este caminho
import Image from "next/image";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp"
import Verification from "../components/Auth/Verification"

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  // Hook para adicionar e remover o listener de scroll
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup para evitar vazamentos de memória
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "screen") {
      setOpenSideBar(false);
    }
  };

  return (
    <header className="w-full relative">
      <div className={active
        ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[100px] z-[80] border-b dark:border-[#FFFFFF1C] shadow-xl transition duration-500"
        : "w-full border-b dark:border-[#FFFFFF1C] h-[80px] z-[80] dark:shadow"
      }>
        <div className="w-[95%] m-auto py-2 h-full flex items-center justify-between">
          <div className="flex items-center w-full h-full">
            <Link href="/" className="relative w-[80px] h-[80px]">
              <Image
                src={Logo}
                alt="Logo"
                className="absolute top-0 left-0 w-full h-full object-cover"
                width={80}
                height={80}
              />
            </Link>
            <NavItems activeItem={activeItem} isMobile={false} />
            <ThemeSwitcher />
            <div className="800px:hidden">
              <HiOutlineMenuAlt3
                size={25}
                className="cursor-pointer dark:text-white text-black"
                onClick={() => setOpenSideBar(true)}
              />
            </div>
            <HiOutlineUserCircle
              size={25}
              className="hidden 800px:block cursor-pointer dark:text-white text-black"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>

        {openSideBar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            {/* Sidebar content */}
          </div>
        )}
      </div>

      {route === "Login" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}

      {route === "Sign-Up" && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}

      {route === "Verification" && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}

    </header>
  );
};

export default Header;
