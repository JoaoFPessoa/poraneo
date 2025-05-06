/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

type BannerData = {
  projetos: any;
  colecoes: any;
  produtos: any;
};

const Banner = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const router = useRouter();
  const [backgrounds, setBackgrounds] = useState<Record<string, string>>({});

  const builder = imageUrlBuilder(client);
  const urlFor = (source: any) => builder.image(source);

  useEffect(() => {
    const fetchData = async () => {
      const data: BannerData = await client.fetch(`*[_type == "banner"][0]{
        projetos,
        colecoes,
        produtos
      }`);

      setBackgrounds({
        "projetos.": urlFor(data.projetos).url(),
        "coleções.": urlFor(data.colecoes).url(),
        "produtos.": urlFor(data.produtos).url(),
      });
    };
    fetchData();
  }, []);

  // Função para lidar com o redirecionamento
  const handleRedirect = (item: string) => {
    // Aqui você pode definir para onde cada item deve redirecionar
    switch (item) {
      case "projetos.":
        router.push("/projetos");
        break;
      case "coleções.":
        router.push("/colecoes");
        break;
      case "produtos.":
        router.push("produtos-mobiliarios");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <div className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-900">
      {/* Background image */}
      <AnimatePresence mode="wait">
        {hovered && (
          <motion.div
            key={hovered}
            className="absolute z-0 flex items-center justify-center w-full h-full pointer-events-none"
          >
            <div className="relative w-full h-[90%] max-w-[800px]">
              <Image
                src={backgrounds[hovered] || ""}
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
        {["projetos.", "coleções.", "produtos."].map((item) => (
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
