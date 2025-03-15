"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css"


const Timer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const updateTimer = () => {
      const endDate = new Date("2025-03-01T23:59:59"); // Data final das inscrições
      const now = new Date();

      const timeDifference = endDate.getTime() - now.getTime();

      if (timeDifference <= 0) {
        setTimeRemaining("Inscrições encerradas ⏰");
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}d:${hours}h:${minutes}m:${seconds}s`);
    };

    // Atualiza o timer imediatamente ao montar o componente
    updateTimer();

    // Atualiza o timer a cada segundo
    const timerInterval = setInterval(updateTimer, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(timerInterval);
  }, []);

  return (
    <Link href="#contact" className={styles.timer}>
      <h2>Tempo restante até o período final de inscrições: {timeRemaining}</h2>
    </Link>
  );
};

export default Timer;
