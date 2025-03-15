"use client"

import { useState, useEffect, JSX } from "react";
import { FaQuestion } from "react-icons/fa6";
import { IoFilmOutline, IoLibraryOutline, IoReorderTwo, IoClose } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { TbTimelineEventPlus } from "react-icons/tb";
import styles from "./style.module.css"
type MenuItem = {
  label: string;
  href: string;
  icon: JSX.Element;
};

const menuItems: MenuItem[] = [
  { label: "Nós", href: "#about", icon: <IoFilmOutline className="iconSvg" /> },
  { label: "Mais", href: "#more", icon: <IoMdAddCircleOutline className="iconSvg" /> },
  { label: "O curso", href: "#timeline", icon: <TbTimelineEventPlus className="iconSvg" /> },
  { label: "Objetivo", href: "#stats", icon: <IoLibraryOutline className="iconSvg" /> },
  { label: "Dúvidas", href: "#doubts", icon: <FaQuestion className="iconSvg" /> },
];

const HeaderLp: React.FC = () => {
  const [isMenuActive, setMenuActive] = useState<boolean>(false);
  const [isHeaderScrolled, setHeaderScrolled] = useState<boolean>(false);
  const [activeLinkIndex, setActiveLinkIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 0);
    };
 
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  const handleLinkHover = (index: number) => {
    setActiveLinkIndex(index);
  };

  return (
    <header className={isHeaderScrolled ? styles.scroll : styles.header}>
      <a href="#" className={styles.logo}>
        <img
          src="/assets/images/logo.png"
          alt="Logo do curso Pensamento Computacional, o desenho de um cérebro laranja, com metade sendo conexões como se fosse artificial, com o nome do curso no centro"
        />
      </a>
      <button className={styles.menuBtn} onClick={toggleMenu}>
        {isMenuActive ? <IoClose /> : <IoReorderTwo />}
      </button>
      <div className={`${styles.navigation} ${isMenuActive ? styles.active : ""}`}>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={item.label}
              className={`list ${index === activeLinkIndex ? styles.active : ""}`}
              onMouseOver={() => handleLinkHover(index)}
            >
              <a href={item.href}>
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.textLink}>{item.label}</span>
              </a>
            </li>
          ))}
          <div className={styles.indicator}></div>
        </ul>
      </div>
    </header>
  );
};

export default HeaderLp;
