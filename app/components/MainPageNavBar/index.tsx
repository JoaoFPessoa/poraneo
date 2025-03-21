import { useState } from "react";

export default function MainPageNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-fit absolute top-0 right-0 md:left-8 lg:bottom-12 z-10  p-8">
      {/* Desktop MainPageNavBar */}
      <div className="hidden lg:flex  h-full items-end">
        <ul className="flex flex-col gap-4 text-2xl font-medium text-black">
          <li className="hover:font-bold transition-all duration-300">
            <a href="#">home</a>
          </li>
          <li className="hover:font-bold transition-all duration-300">
            <a href="#">sobre</a>
          </li>
          <li className="hover:font-bold transition-all duration-300">
            <a href="/projects  ">projetos</a>
          </li>
          <li className="hover:font-bold transition-all duration-300">
            <a href="/products">produtos</a>
          </li>
          <li className="hover:font-bold transition-all duration-300">
            <a href="#">contato</a>
          </li>
        </ul>
      </div>

      {/* Mobile MainPageNavBar */}
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute right-12 top-16 w-fit bg-black rounded-lg p-4 shadow-lg">
            <ul className="flex flex-col gap-4 text-2xl text-white">
              <li className="hover:scale-105 transition-all duration-300">
                <a href="#">Home</a>
              </li>
              <li className="hover:scale-105 transition-all duration-300">
                <a href="#">Sobre</a>
              </li>
              <li className="hover:scale-105 transition-all duration-300">
                <a href="/products">Produtos</a>
              </li>
              <li className="hover:scale-105 transition-all duration-300">
                <a href="#">Contato</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
