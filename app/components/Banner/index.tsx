"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Banner = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const router = useRouter();

  const backgrounds: Record<string, string> = {
    projetos: "/projects/expo-2-cover.jpg",
    colecoes: "/carnan-chair/main.jpg",
    produtos: "/carnan-chair/main.jpg",
  };

  // Função para lidar com o redirecionamento
  const handleRedirect = (item: string) => {
    // Aqui você pode definir para onde cada item deve redirecionar
    switch (item) {
      case "projetos":
        router.push("/projects");
        break;
      case "colecoes":
        router.push("/colecoes");
        break;
      case "produtos":
        router.push("/products");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <div className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-900">
      {/* Logo - Responsivo */}
      <div className="absolute top-[5%] left-[5%] sm:top-[10%] sm:left-[5%]">
        <Image
          src={"/logo/yellow-no-bg.png"}
          alt="poraneo-logo"
          width={200}
          height={300}
          className="w-[120px] sm:w-[150px] md:w-[200px]"
        />
      </div>

      {/* Background image */}
      <AnimatePresence mode="wait">
        {hovered && (
          <motion.div
            key={hovered}
            className="absolute z-0 flex items-center justify-center w-full h-full pointer-events-none"
          >
            <div className="relative w-full h-full max-w-[1200px]">
              <Image
                src={backgrounds[hovered]}
                alt={hovered}
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texts - Responsivo */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 text-7xl lg:text-5xl xl:text-6xl lg:font-semibold  text-black dark:text-white px-4">
        {["projetos", "colecoes", "produtos"].map((item) => (
          <div
            key={item}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer transition-colors duration-300 hover:text-primary text-center"
            onClick={() => handleRedirect(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
