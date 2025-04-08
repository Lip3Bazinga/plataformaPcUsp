"use client";

import React, { useState, useRef, useEffect } from "react";
import HeaderLp from "@/app/components/HeaderLp";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import Timer from "@/app/components/Timer";
import AccordionItem from "@/app/components/AccordionItem";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "@/app/components/Dropdown";
import { MdArrowForwardIos, MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoClose, IoChevronBack } from "react-icons/io5";
import Footer from "@/app/components/Footer";
import styles from "./styles.module.css";

interface CardData {
  id: string;
  title: string;
  language: string;
  description: string;
  text: string;
  link: string;
}

interface DoubtsData {
  id: string;
  label: string;
  content: string;
}

const dataCards: CardData[] = [
  {
    id: "1",
    title: "Módulo Iniciante",
    language: "Scratch",
    description: "Linguagem simples e intuitiva ideal para desenvolver jogos",
    text: "O módulo iniciante em Scratch é para os alunos que querem dar os seus primeiros passos no mundo da programação, indicado para alunos do fundamental II. O Scratch é uma linguagem de programação em blocos criada pelo MIT",
    link: "https://scratch.mit.edu/",
  },
  {
    id: "2",
    title: "Módulo Iniciante",
    language: "AppInventor",
    description: "Linguagem intuitiva voltada para o desenvolvimento de aplicativos mobile",
    text: "O módulo iniciante em AppInventor é indicado para os alunos do Fundamental II e também do Ensino Médio, que querem aprender a desenvolver aplicativos mobile. Assim como o Scratch, o AppInventor também é uma linguagem de programação que utiliza de blocos para facilitar o desenvolvimento, o que torna a linguagem extremamente intuitiva, além disso, também foi desenvolvida pelo MIT.",
    link: "https://appinventor.mit.edu/",
  },
  {
    id: "3",
    title: "Módulo Intermediário",
    language: "JavaScript",
    description: "Linguagem de alto nível e dinâmica voltada para o desenvolvimento web",
    text: "O módulo intermediário em JavaScript é para os alunos, preferencialmente que estejam no mínimo no ensino médio, ou +18. O JavaScript é uma das principais linguagens do mercado de tecnologia, utilizado para diversas áreas, e fundamental para o desenvolvimento web, tanto Front-End, quanto Back-End.",
    link: "https://javascript.org",
  },
  {
    id: "4",
    title: "Módulo Intermediário",
    language: "Python",
    description: "Linguagem de alto nível eficiente em ciência da dados e back-end",
    text: "O módulo avançado em Python, assim como o JavaScript, é voltado para os alunos do Ensino médio, e pessoas maiores de idade. O Python é uma linguagem de alto nível que possui uma sintaxe amigável e uma grande comunidade, o que a torna muito atrativa, dominando áreas como Ciência de Dados, Inteligência Artificial e Back-End.",
    link: "https://python.org",
  },
];

const dataDoubts: DoubtsData[] = [
  {
    id: "first",
    label: "Para quem é o curso Pensamento Computacional?",
    content: " O curso é voltado, mas não exclusivo, para crianças e adolescentes de que têm interesse em tecnologia, programação, ciência da computação e afins."
  },
  {
    id: "third",
    label: "Como faço para me inscrever no Curso Pensamento Computacional?",
    content: "Para se inscrever é fácil, basta preencher o nosso formulário de inscrição. Nosso time entrará em contato para consolidar a sua vaga, então fique atento ao seu e- mail e WhatsApp."
  },
  {
    id: "fourth",
    label: "Qual é a programação e o formato do evento?",
    content: " Essa edição do curso iniciará dia 03/03/2025, aguarda novas informações relativas ao horário. O horário será discutido ao final do período de inscrição de forma que todos os alunos inscritos possam ter o melhor aproveitamento possível. O curso é 100% online e será conduzido por plataformas como Google Classroom e Google Meet afim de trazer a maior qualidade para os alunos."
  },
  {
    id: "fifty",
    label: "Os métodos apresentados já foram validados?",
    content: " Sim! Os métodos foram discutidos e baseados em cases práticos e reais. Temos mais de 10 anos de curso e anualmente formamos, em média, 6 turmas de alunos. Levamos em considerações artigos e pesquisas para o desenvolvimento da lógica e cognitividade dos infantojuvenis."
  },
]


export default function Page() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    cidade: "",
    email_aluno: "",
    email_responsavel: "",
    telefone_aluno: "",
    telefone_responsavel: "",
  });

  useEffect(() => {
    const typeWriterTitle = (element: HTMLHeadingElement) => {
      const textArray = element.innerHTML.split("");
      element.innerText = "";
      element.style.display = "block";

      textArray.forEach((letter, i) => {
        setTimeout(() => {
          element.innerHTML += letter;
        }, 75 * i);
      });
    };

    if (titleRef.current) {
      titleRef.current.style.display = "none";
      setTimeout(() => {
        typeWriterTitle(titleRef.current!);
      }, 500);
    }
  }, []);

  const handleCardClick = (id: string) => {
    const card = dataCards.find((card) => card.id === id);
    if (card) {
      setSelectedCard(card);
      document.body.style.overflowY = "hidden";
    }
  };

  const closeModal = () => {
    setSelectedCard(null);
    document.body.style.overflowY = "scroll";
  };

  return (
    <div className={`${styles.main} font-[62.5%]`}>

      <Link href={"/"} className="group absolute top-2 left-3 w-[40px] h-[40px] rounded-[50%] border-[3px] hover:border-[#F98148] bg-[rgb(0,0,0,0.1)] z-10 flex justify-center items-center transition-all duration-200 ease-in-out hover:scale-95">
        <IoChevronBack size={20} className="text-white group-hover:text-[#F98148]" />
      </Link>

      <Timer />
      <WhatsAppButton />
      <HeaderLp />

      <div className={selectedCard ? styles.blur + ' ' + styles.active : styles.blur}></div>

      <section className={styles.banner}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1 ref={titleRef} style={{ display: "none" }}>
            Curso Pensamento Computacional
          </h1>
          <p>Venha dar o primeira passo para o mundo da tecnologia com a maior do Brasil! </p>
          <Link href="#contact">Garanta a sua vaga agora</Link>
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className={styles.content}>
          <div className={styles.left}>
            <h2 className={styles.title}>O que é o curso?</h2>
            <p>
              O Pensamento Computacional é um curso oferecido pela USP de Ribeirão Preto com mais de 10 anos e liderado pela Professora Dra. Alessandra Alaniz Macedo. O nosso propósito é democratizar o ensino da computação para crianças e adolescentes. Nesse sentido, o curso foi desenvolvido e aprimorado para auxiliar os alunos nos primeiros passos no mundo da tecnologia, ensiná-los a essência da computação e ajudá-los na iniciação do desenvolvimento dos seus primeiros programas.
            </p>
            <a href="#contact">Inscreva-se</a>
          </div>
          <div className={styles.right}>
            <Image src="/assets/images/img1.jpg" alt="" width={500} height={300} />
          </div>
        </div>
      </section>

      <section className={styles.more} id="more">
        <div className={styles.content}>
          <h2 className={styles.title}>Como funciona o curso?</h2>
          <p>
            O curso é dividido em 3 tipos: o Módulo Iniciante, o Módulo Intermediário e o Módulo Avançado. Tanto no Módulo Iniciante quanto no Módulo Intermediário há duas trilhas que o aluno pode escolher, uma mais básica e outra mais avançada. Para o Módulo Iniciante, a trilha em Scratch é a trilha iniciante, enquanto a trilha AppInventor é a trilha avançada. No Módulo Intermediário, o Python é a iniciante e a JavaScript é a avançada. Já no Módulo Avançado, há uma única trilha em Unity. Seguem algumas informações sobre cada módulo, trilha e linguagem.
          </p>
        </div>
        <div className={`${styles.creativeCards} ${styles.styleOne}`}>
          <div className={styles.container}>
            {selectedCard && (
              <div id="modal" className={`${selectedCard ? styles.active : ""}`}>
                <h3 className={styles.modal_title}>{`${selectedCard.title} - ${selectedCard.language}`}</h3>
                <p className={styles.modal_text}>{selectedCard.text}</p>
                <a href={selectedCard.link} target="_blank" rel="noopener noreferrer" className={styles.modal_link}>
                  Saiba mais
                </a>
                <button onClick={closeModal}>
                  <IoClose />
                </button>
              </div>
            )}
            <div className={styles.row}>
              {dataCards.map((card) => (
                <div className={styles.cardColumn} key={card.id}>
                  <div className={styles.cardDetails}>
                    <div className={styles.cardIcons}>
                      <Image
                        src={`/assets/images/${card.language.toLowerCase()}_logo.png`}
                        alt={card.language}
                        width={50}
                        height={50}
                        style={{ scale: 1.5 }}
                      />
                    </div>
                    <h3>
                      {card.title} <span>{card.language}</span>
                    </h3>
                    <p>{card.description.split(".")[0]}...</p>
                    <button className={styles.readMoreBtn} onClick={() => handleCardClick(card.id)}>
                      <MdArrowForwardIos size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.timeline} id="timeline">
        <div className={styles.timeline_svg}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.svg_top}>
            <path
              fill="var(--black)"
              fillOpacity="1"
              d="M0,224L48,229.3C96,235,192,245,288,213.3C384,181,480,107,576,101.3C672,96,768,160,864,181.3C960,203,1056,181,1152,197.3C1248,213,1344,267,1392,293.3L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className={styles.outer}>
          <div className={styles.card}>
            <div className={styles.info}>
              <h3 className={styles.title_text}>Introdução ao curso</h3>
              <p>A primeira aula consiste em explicar o funcionamento do curso, explicar o material e apresentar do professor.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.info}>
              <h3 className={styles.title_text}>O computador</h3>
              <p>Toda boa aula começa com uma boa história, e no nosso curso não é diferente. Antes de chegarmos aos computadores modernos dos dias de hoje, é essencial entender o porquê deles terem sido criados e como funcionam.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.info}>
              <h3 className={styles.title_text}>O pensamento computacional</h3>
              <p>Será apresentado aos alunos o conceito do Pensamento Computacional, sua utilidade e funcionamento, entendendo os seus 4 pilares para desenvolver uma habilidade para de resolução de problemas e desafios de forma eficiente.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.info}>
              <h3 className={styles.title_text}>A linguagem de programação</h3>
              <p>Aqui começa a programação. Iremos explicar o que é uma linguagem, as diferenças entre elas e como elas funcionam. Logo em seguida, começaremos a programar do básico.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.info}>
              <h3 className={styles.title_text}>Na prática</h3>
              <p>Após passada toda a base necessária, os estudos anteriores serão consolidades por meio de exercícios e atividades práticas de desenvolvimento de programas, garantindo que os alunos alcancem os resultados esperados por meio da prática.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.info}>
              <h3 className={styles.title_text}>Apresentação</h3>
              <p>Na etapa final, é necessário que o aluno apresente um projeto prático desenvolvido por ele com o propósito de averiguar o seu progresso no curso e certificá-lo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stats} id="stats">
        <div className={styles.content}>
          <h3>Nossa história</h3>
          <p>
            O curso Pensamento Computacional nasceu com o propósito de democratizar o acesso ao aprendizado da ciência da computação para crianças e adolescentes de todo o Brasil.
          </p>
          <div className={styles.statsBox}>
            <div className={styles.box}>
              <h2>10+</h2>
              <h4>Anos de projeto</h4>
            </div>
            <div className={styles.box}>
              <h2>100+</h2>
              <h4>Alunos</h4>
            </div>
            <div className={styles.box}>
              <h2>5+</h2>
              <h4>Colaboradores</h4>
            </div>
            <div className={styles.box}>
              <h2>2400+</h2>
              <h4>Horas de aulas</h4>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.doubts} id="doubts">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.svg_top}>
          <path
            fill="var(--orange)"
            fillOpacity="1"
            d="M0,224L48,229.3C96,235,192,245,288,213.3C384,181,480,107,576,101.3C672,96,768,160,864,181.3C960,203,1056,181,1152,197.3C1248,213,1344,267,1392,293.3L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <div className={styles.content}>
          <div className={styles.content_left}>
            <h2>Ficou com dúvidas?</h2>
            <p>Listamos as perguntas mais comuns. Você também pode falar com o nosso time de atendimento. Estamos prontos para te ajudar!</p>
            <div className={styles.cards}>
              <Link href="https://wa.me/5511955208805" target="_blank" className={styles.card}>
                <FaWhatsapp color="green" />
                <h3>Falar por WhatsApp</h3>
                <p>
                  <span>Conversar</span>
                </p>
              </Link>
              <Link
                href="mailto:pcusp_rp@usp.br?subject=Interesse%20no%20Curso%20Pensamento%20Computacional"
                target="_blank"
                className={styles.card}
              >
                <MdEmail color="" />
                <h3>Falar por E-mail</h3>
                <p>
                  <span>Conversar</span>
                </p>
              </Link>
            </div>
          </div>
          <div className={styles.content_right}>
            <p>Tire suas dúvidas</p>
            <h2>Dúvidas frequentes</h2>
            <ul className={styles.accordion}>
              {dataDoubts.map((item) => (
                <AccordionItem
                  key={item.id}
                  id={item.id}
                  question={item.label}
                  answer={item.content}
                  defaultChecked={false} // Ajuste conforme necessário
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
