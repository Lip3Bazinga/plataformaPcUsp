import { GrInstagram } from "react-icons/gr";
import { FaTiktok } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Image from "next/image";
const Footer = () => {

  return (
    <footer>
      <div className="content">
        <div className="content_left">
          <h2>Não perca a oportunidade de aprender as ferramentas que estão moldando o mundo!</h2>
          <a href="#contact" target="">Cadastre-se</a>
        </div>
        <div className="content_center">
          <h2>Todos os direitos reservados <span>©️</span></h2>
          <div className="content_logo">
            <Image
              src="/assets/images/logo.png"
              width={150}
              height={100}
              alt="Logo do pensamento computacional, um cérebro com circuitos."
            />
          </div>
          <div className="content_logo">
            <Image
              src="/assets/images/usp.png"
              width={150}
              height={100}
              alt="Logo da Universidade de São Paulo."
            />
          </div>
        </div>
        <div className="content_right">
          <a href="https://www.instagram.com/pcusp/" target="_blank" className="card">
            <GrInstagram />
          </a>
          <a href="https://www.tiktok.com/@pc_usp" target="_blank" className="card" >
            <FaTiktok />
          </a>
          <a href="mailto:pcusp_rp@usp.br?subject=Interesse%20no%20Curso%20Pensamento%20Computacional" target="_blank" className="card" >
            <IoMdMail />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;