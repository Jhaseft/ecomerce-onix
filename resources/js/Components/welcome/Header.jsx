import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Header({ auth }) {
  const { props } = usePage(); // props de Inertia
  const [flashMessage, setFlashMessage] = useState(null);

  // Detectar mensaje flash
  useEffect(() => {
    if (props?.flash?.success) {
      setFlashMessage({ type: 'success', message: props.flash.success });
      setTimeout(() => setFlashMessage(null), 2000); // desaparece en 2s
    } else if (props?.flash?.error) {
      setFlashMessage({ type: 'error', message: props.flash.error });
      setTimeout(() => setFlashMessage(null), 3000); // error 3s
    }
  }, [props]);

  return (
    <>
      <header className="w-full bg-brandBlack text-white shadow-md py-4 relative">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* LOGO A LA IZQUIERDA */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dnbklbswg/image/upload/v1763039388/automatizando_logo-removebg-preview_eekag0.png"
              alt="Logo de la empresa"
              className="h-20 w-20 md:h-32 md:w-32 object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* NAVEGACIÓN A LA DERECHA */}
          <nav className="flex gap-6 text-lg md:text-xl font-medium">
            {auth?.user ? (
              <>
                <Link
                  href={route('welcome')}
                  className="relative hover:text-brandGold transition duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-brandGold after:transition-all after:duration-300 hover:after:w-full"
                >
                  Perfil
                </Link>
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="relative hover:text-brandGold transition duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-brandGold after:transition-all after:duration-300 hover:after:w-full"
                >
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="relative hover:text-brandGold transition duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-brandGold after:transition-all after:duration-300 hover:after:w-full"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href={route('register')}
                  className="relative hover:text-brandGold transition duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-brandGold after:transition-all after:duration-300 hover:after:w-full"
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Mensaje flash debajo del Header */}
      {flashMessage && (
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
            flashMessage.type === 'success'
              ? 'bg-black'
              : 'bg-red-600'
          } text-white px-6 py-4 rounded-lg shadow-lg animate-slideDown`}
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
