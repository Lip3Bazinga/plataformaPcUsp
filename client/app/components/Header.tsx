import React, { FC, useState, useEffect } from "react";
import Link from "next/link";

type Props = { 
  open: boolean;
  setOpen: (open: boolean) => void;
  activateItem: number;
};

const Header: FC<Props> = (props) => {
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="w-full relative">
      <h1 className="text-red-100 absolute z-1000">
        Header
      </h1>
      <div className={`${
        active 
          ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#FFFFFF1C] shadow-xl transition duration-500" 
          : "w-full border-b dark:border-[#FFFFFF1C] h-[80px] z-[80] dark:shadow"
      }`}>
        Header
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link href={"/"} className=" text-[25px] font-Poppins font-[500] text-black dark:text-dark">
                PC-USP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
