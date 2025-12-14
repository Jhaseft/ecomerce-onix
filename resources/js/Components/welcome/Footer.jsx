import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="bg-black text-center py-12 mt-10 border-t border-white shadow-inner"
    >
      {/* Nombre de la empresa y derechos */}
      <p className="text-white font-medium tracking-wide mb-6">
        © {new Date().getFullYear()} ONIX Inmobiliaria — Todos los derechos reservados.
      </p>

      {/* Redes sociales */}
      <div className="flex justify-center mb-6 gap-4">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
        >
          <FaInstagram size={36} />
        </a>
        {/* Puedes agregar más links aquí, por ejemplo Facebook o LinkedIn */}
      </div> 

      {/* Información de contacto */}
      <div className="text-white text-sm space-y-3">
        <p className="text-lg font-semibold">
           +56 978843627
        </p>

        <p className="text-xs tracking-wide">
          Política de privacidad | Términos de uso
        </p>

        <div className="mt-4 font-medium">
          <p className="text-white font-semibold mb-1">Bolivia bl</p>
          <p>Atención personalizada vía WhatsApp e Instagram</p>
        </div>
      </div>
    </footer>
  );
}
