'use client';

import Link from 'next/link';
import React, { useRef, useState } from 'react';

const Page = () => {
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  const handleMouseEnterLeft = () => {
    console.log('Entrou esquerda')
    setHoverLeft(true);
  };

  const handleMouseLeaveLeft = () => {
    console.log('Deixou esquerda')
    setHoverLeft(false);
  };

  const handleMouseEnterRight = () => {
    console.log('Entrou direita')
    setHoverRight(true);
  };

  const handleMouseLeaveRight = () => {
    console.log('Deixou Direita')
    setHoverRight(false);
  };

  return (
    <div className="h-screen w-screen relative bg-gray-800">
      <div className={`flex justify-center items-center h-full w-full ${hoverLeft ? 'hover-left' : ''} ${hoverRight ? 'hover-right' : ''}`}>
        <div
          className="container split left flex-1 h-full relative overflow-hidden"
          onMouseEnter={handleMouseEnterLeft}
          onMouseLeave={handleMouseLeaveLeft}
        >
          <h1 className=" z-10 text-5xl text-white absolute left-1/2 top-1/4 transform -translate-x-1/2 whitespace-nowrap">
            Assíncrono
          </h1>
          <a
            href="#"
            className="btn z-10 text-white absolute left-1/2 top-2/3 transform -translate-x-1/2 border border-white text-center font-bold text-lg uppercase p-4 w-40"
          >
            Saiba mais
          </a>
          <div
            className="absolute w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url("/assets/images/banner_separacao_esquerda.png")',
            }}
          />
          <div
            className="absolute w-full h-full bg-opacity-70 bg-blue-700"
            style={{
              backgroundColor: 'rgba(87,84,236,0.7)',
            }}
          />
        </div>
        <div
          className="container split right flex-1 h-full relative overflow-hidden"
          onMouseEnter={handleMouseEnterRight}
          onMouseLeave={handleMouseLeaveRight}
        >
          <h1 className="z-10 text-5xl text-white absolute left-1/2 top-1/4 transform -translate-x-1/2 whitespace-nowrap">
            Síncrono
          </h1>
          <Link
            href="/cursos/sincrono"
            className=" btn z-10 text-white absolute left-1/2 top-2/3 transform -translate-x-1/2 border border-white text-center font-bold text-lg uppercase p-4 w-40"
          >
            Saiba mais
          </Link>
          <div
            className="absolute w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url("assets/images/banner_separacao_direita.png")',
            }}
          />
          <div
            className="absolute w-full h-full bg-opacity-80 bg-gray-900"
            style={{
              backgroundColor: 'rgba(43, 43, 43, 0.8)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
