"use client"

import ThemeSwitcher from "@/app/utils/ThemeSwitcher"
import { FC, useState } from "react"
import { IoMdNotificationsOutline } from "react-icons/io"
import { FaDeleteLeft } from "react-icons/fa6";
type Props = {

}

const DashboardHeader: FC<Props> = () => {

  const [open, setOpen] = useState(false)

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3CCBA0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>
      {
        open && (
          <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded overflow-scroll ">
            <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">Notificações</h5>
            <div className="dark:bg-[#2D3A4EA1] bg-[#00000013] font-Poppins border-b dark:border-b-[#FFFFFF47] border-b-[#0000000F] ">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  Nova pergunta recebida
                </p>
                <FaDeleteLeft size={30} color="#f05a55" className="cursor-pointer transition-all duration-400 ease-in-out hover:scale-90" />
              </div>
              <p className="px-2 text-black dark:text-white">

                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus et, libero pariatur fuga illo eveniet error officiis deleniti, ea doloremque reprehenderit velit. Numquam, omnis. Amet quidem tenetur libero blanditiis explicabo.
              </p>
              <p className="p-2 text-black dark:text-white text-[14px]">
                5 dias atrás
              </p>
            </div>
            <div className="dark:bg-[#2D3A4EA1] bg-[#00000013] font-Poppins border-b dark:border-b-[#FFFFFF47] border-b-[#0000000F]">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  Nova pergunta recebida
                </p>
                <FaDeleteLeft size={30} color="#f05a55" className="cursor-pointer transition-all duration-400 ease-in-out hover:scale-90" />
              </div>
              <p className="px-2 text-black dark:text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus et, libero pariatur fuga illo eveniet error officiis deleniti, ea doloremque reprehenderit velit. Numquam, omnis. Amet quidem tenetur libero blanditiis explicabo.
              </p>
              <p className="p-2 text-black dark:text-white text-[14px]">
                5 dias atrás
              </p>
            </div>
            <div className="dark:bg-[#2D3A4EA1] bg-[#00000013] font-Poppins border-b dark:border-b-[#FFFFFF47] border-b-[#0000000F]">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  Nova pergunta recebida
                </p>
                <FaDeleteLeft size={30} color="#f05a55" className="cursor-pointer transition-all duration-400 ease-in-out hover:scale-90" />
              </div>
              <p className="px-2 text-black dark:text-white ">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus et, libero pariatur fuga illo eveniet error officiis deleniti, ea doloremque reprehenderit velit. Numquam, omnis. Amet quidem tenetur libero blanditiis explicabo.
              </p>
              <p className="p-2 text-black dark:text-white text-[14px]">
                5 dias atrás
              </p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default DashboardHeader
