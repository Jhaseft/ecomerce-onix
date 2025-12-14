import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Header({ auth }) {
  const { props } = usePage();
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    if (props?.flash?.success) {
      setFlashMessage({ type: 'success', message: props.flash.success });
      setTimeout(() => setFlashMessage(null), 2000);
    } else if (props?.flash?.error) {
      setFlashMessage({ type: 'error', message: props.flash.error });
      setTimeout(() => setFlashMessage(null), 3000);
    }
  }, [props]);

  return (
    <>
      <header className="w-full bg-black text-white shadow-lg py-4 border-b-2 border-white">
        <div className="container mx-auto flex justify-between items-center px-6">

          <Link href="/" className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dnbklbswg/image/upload/v1765744914/logo-removebg-preview_2_swgnso.png"
              alt="Logo de la tienda"
              className="h-20 w-40 md:h-40 md:w-72 object-contain transition-transform duration-300 hover:scale-105 drop-shadow-lg"
            />
          </Link>

          <nav className="flex md:text-xl md:gap-10 text-xs gap-1 font-medium">
            <Link
              href="/Contacto"
              className="
                relative
                text-xl
                font-semibold
                text-white
                transition-all
                duration-300
                hover:text-gray-300
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:w-0
                after:bg-white
                after:transition-all
                after:duration-300
                hover:after:w-full
              "
            >
              Contacto
            </Link>
          </nav>

        </div>
      </header>

      {flashMessage && (
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 
            ${flashMessage.type === 'success' ? 'bg-white text-black' : 'bg-red-600 text-white'} 
            px-6 py-4 rounded-lg shadow-xl animate-slideDown`}
        >
          {flashMessage.message}
        </div>
      )}

      <style>
        {`
          @keyframes slideDown {
            0% { opacity: 0; transform: translateY(-20px) translateX(-50%); }
            100% { opacity: 1; transform: translateY(0) translateX(-50%); }
          }
          .animate-slideDown {
            animation: slideDown 0.5s ease-out forwards;
          }
        `}
      </style>
    </>
  );
}
