"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login")
  const handleClick = (item: number) => {
    setActiveItem(item);
  };

  return (
    <div>
      <Heading
        title="Plataforma PC-USP"
        description="A plataforma é uma iniciativa da USP que visa democratizar o acesso de cursos de qualidade de programação em solo brasileiro, por meio de uma plataforma gratuita de cursos online com certificações."
        keywords="Programação, Pensamento Computacional, USP"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      {/* Exemplo de uso do handleClick */}
      <button onClick={() => handleClick(1)}>Ativar Item 1</button>
    </div>
  );
};

export default Page;