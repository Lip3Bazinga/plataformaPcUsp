import Link from "next/link";
import React from "react"

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Cursos",
    url: "/cursos",
    courses: [
      {
        name: "Assíncrono",
        url: "/cursos/assincronos"
      },
      {
        name: "Síncrono",
        url: "/cursos/sincronos"
      }
    ]
  },
  {
    name: "Nós",
    url: "/nos",
  },
  {
    name: "Blog",
    url: "/blog",
  },
  {
    name: "Política",
    url: "/politica",
  },
  {
    name: "FAQ",
    url: "/faq",
  }
]

type Props = {
  activeItem: number;
  isMobile: boolean;
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {
          navItemsData && navItemsData.map((i, index) => (
            <div key={index} className="relative group">
              <Link href={`${i.url}`} passHref>
                <span
                  className={`${activeItem === index
                    ? "dark:text-[#8C52FF] text-[#FF914D]"
                    : "dark:text-white text-black"
                    } text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
              {i.courses && (
                <div className="absolute top-full right-[50%] translate-x-[50%] mt-1 w-[150px] text-center origin-top scale-y-0 rounded-lg bg-gray-200 shadow-md transition-all duration-4000 ease-in-out group-hover:scale-y-100">
                  {i.courses.map((course) => (
                    <Link href={course.url} key={course.name} passHref>
                      <span className="block cursor-pointer p-3 hover:bg-[#FF914D] hover:text-black rounded-lg">
                        {course.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))
        }
      </div>
      {
        isMobile && (
          <div className="800px:hidden mt-5">
            {
              navItemsData && navItemsData.map((i, index) => (
                <Link href={i.url} key={index} passHref>
                  <span
                    className={`${activeItem === index
                      ? "dark:text-[#37A39A] text-[crimson]"
                      : "dark:text-white text-black"
                      } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                  >
                    {i.name}
                  </span>
                </Link>
              ))
            }
          </div>
        )
      }
    </>
  )
}

export default NavItems
