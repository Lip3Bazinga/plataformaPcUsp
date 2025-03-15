import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <div className="whatsApp_button">
      <Link href="https://wa.me/5511955208805" target="_blank">
        <FaWhatsapp className="iconSvg" />
      </Link>
    </div>
  )
}

export default WhatsAppButton