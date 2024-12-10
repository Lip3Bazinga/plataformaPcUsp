import React, { FC } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";

import BannerImage from "../../../public/assets/banner-img-1.png"

// type Props = {};

const Hero: FC = () => {
  return (
    <div className="relative w-full h-[100vh] flex flex-col sm:flex-row items-center justify-between dark:hero-animation">
      <div className="flex items-center justify-center h-full w-full sm:w-1/2 relative">
        {/* Ajustando as dimensões da animação */}
        <div className="absolute top-[50px] sm:top-[unset] h-[30vh] w-[30vh] sm:h-[500px] sm:w-[500px] hero_animation rounded-full"></div>
        <Image
          src={BannerImage}
          alt="Banner Image"
          className="object-contain max-w-[350px] sm:max-w-[300px] h-auto mx-auto z-10" // Aumentando o tamanho da imagem
        />
      </div>
      <div className="flex-1 flex flex-col items-start text-left p-5 z-10 w-full sm:w-1/2">
        <h2 className="dark:text-white text-[#000000C7] text-[24px] sm:text-[30px] px-3 w-full font-bold py-2 leading-tight">
          Venha aprender a programar com a
          <span className="pl-2 text-[#8C52FF] font-extrabold">
            maior Universidade da América Latina
          </span>
        </h2>
        <p className="pl-2 dark:text-[#EDFFF4] text-[#000000AC] font-semibold text-[16px] sm:text-[18px] max-w-lg mt-5">
          Nós temos <span className="text-[#FF914D] font-bold">155+</span> cursos & <span className="text-[#FF914D] font-bold">300+</span> Alunos. Procure o curso que mais faça sentido para você e <span className="text-[#FF914D] font-bold">estude de graça e pegue seu certificado ao final do curso</span>.
        </p>
        <div className="pl-2 relative w-full mt-5">
          <input
            type="search"
            placeholder="Pesquise um curso..."
            className="bg-transparent border border-[#1b1b1b] dark:border-none dark:bg-[#1D1D1D] 
               placeholder:text-[#1b1b1b] dark:placeholder:text-[#FFFFFF] 
               rounded-l-md p-2 w-full h-full outline-none text-[#1b1b1b] 
               dark:text-[#FFFFFFE6] text-[16px] sm:text-[20px] font-medium"
          />
          <button className="absolute right-0 top-0 bg-[#8C52FF] border-none p-2 h-full hover:bg-[#FF914D] transition duration-200 outline-none">
            <BiSearch className="text-white" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;