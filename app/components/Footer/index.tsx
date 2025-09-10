import { Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-gray-800 mt-36 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logo/black-no-bg.png"
              width={150}
              height={150}
              alt="logo"
            />
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center ">
            <h3 className="text-xl font-semibold mb-4">links rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-black transition-all duration-300"
                >
                  início
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-black transition-all duration-300"
                >
                  Sobre
                </a>
              </li>
              {/* <li>
                <a
                  href="/produtos"
                  className="text-gray-400 hover:text-black transition-all duration-300"
                >
                  Produtos
                </a>
              </li> */}
              <li>
                <a
                  href="/projetos"
                  className="text-gray-400 hover:text-black transition-all duration-300"
                >
                  projetos
                </a>
              </li>
              <li>
                <a
                  href="/colecoes"
                  className="text-gray-400 hover:text-black transition-all duration-300"
                >
                  coleções
                </a>
              </li>
              {/* <li>
                <a
                  href="/produtos-mobiliarios"
                  className="text-gray-400 hover:text-black transition-all duration-300"
                >
                  Produtos
                </a>
              </li> */}
            </ul>
          </div>

          {/* Social Media Section */}
          <a
            href="https://www.instagram.com/porane0/"
            target="_blank"
            className="flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold mb-4">siga-nos</h3>
            <div className="flex space-x-4">
              <Instagram />
            </div>
          </a>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Poraneo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
