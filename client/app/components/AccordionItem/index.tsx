"use client";

import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import styles from "./styles.module.css"; // Importe o CSS Module

interface Props {
  id: string;
  question: string;
  answer: string;
  defaultChecked: boolean;
}

const AccordionItem: React.FC<Props> = ({ id, question, answer, defaultChecked }) => {
  const [isOpen, setIsOpen] = useState(defaultChecked);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const toggleAccordion = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Não renderiza nada até a hidratação
  if (!hydrated) return null;

  return (
    <li className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}>
      <label htmlFor={id} onClick={toggleAccordion}>
        {question}
        <span className={`${styles.icon} ${isOpen ? styles.rotated : ""}`}>
          <MdKeyboardArrowRight />
        </span>
      </label>
      {/* Removemos o input */}
      <div className={`${styles.content} ${isOpen ? styles.show : ""}`}>
        <p>{answer}</p>
      </div>
    </li>
  );
};

export default AccordionItem;
