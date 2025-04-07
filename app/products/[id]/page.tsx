"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Footer from "../../components/Footer";
import { productsMock } from "@/data/productsMock";
import Navbar from "@/app/components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const product = productsMock.find((p) => p.id === productId);
  const [scrolled, setScrolled] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-8 border border-white/20 rounded-lg backdrop-blur-lg"
        >
          Produto não encontrado
        </motion.div>
      </div>
    );
  }

  const allImages = [product.image, ...product.extraImages].filter(Boolean);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section com Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: `url(${product.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
            transform: scrolled ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.5s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-20 container max-w-7xl mx-auto px-6 h-full flex flex-col justify-center"
        >
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="inline-block w-fit bg-white/10 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-medium mb-4 border border-white/20"
          >
            {product.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-6xl md:text-8xl font-black leading-tight tracking-tight"
          >
            {product.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-4xl font-bold text-primary mt-4"
          >
            {product.price}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8 flex gap-4"
          >
            <button className="bg-white text-black py-4 px-8 rounded-full text-xl font-semibold hover:bg-gray-200 transition group">
              Faça um orçamento
              <span className="ml-2 inline-block transition group-hover:translate-x-1">
                →
              </span>
            </button>
            <button
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
              className="bg-transparent border border-white/30 backdrop-blur-sm py-4 px-8 rounded-full text-xl font-semibold hover:bg-white/10 transition"
            >
              Detalhes
            </button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            className="animate-bounce cursor-pointer"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Galeria de Imagens */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-square w-full  overflow-hidden mb-6 border border-white/10">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={allImages[activeImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className=" transition hover:scale-105 duration-700"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {allImages.map((img, index) => (
                <div
                  key={index}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                    activeImageIndex === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg hover:opacity-80 transition"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Informações do Produto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-4">Sobre o Produto</h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isSpecsOpen ? "auto" : 0,
                  opacity: isSpecsOpen ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-2xl font-bold mb-4">Descrição Técnica</h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {product.technicalDescription}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <h3 className="text-2xl font-bold mb-4">Dimensões</h3>
                  <p className="text-lg text-gray-300">{product.dimensions}</p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <h3 className="text-2xl font-bold mb-4">Especificações</h3>
                  <ul className="space-y-2 text-lg text-gray-300">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <button
                onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                className="inline-flex items-center text-primary font-medium text-lg hover:opacit-80 transition"
              >
                {isSpecsOpen
                  ? "Ocultar especificações"
                  : "Ver especificações completas"}
                <svg
                  className={`ml-2 w-5 h-5 transform transition duration-300 ${
                    isSpecsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="pt-8 mt-8 border-t border-white/10">
                <div className="flex flex-col gap-4">
                  <button className="w-full bg-white text-black py-4 px-8 rounded-lg text-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center">
                    <span>Faça um orçamento</span>
                    <span className="ml-2 inline-block">→</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Seção de Características Destacadas */}
      </main>

      {/* CTA Final */}
      {/* <div className="relative py-32 mt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-black z-0" />
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `url(${product.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Pronto para transformar seu lar?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Entre em contato hoje mesmo e descubra como nossos produtos podem
              fazer a diferença.
            </p>
            <button className="bg-white text-black py-5 px-10 rounded-full text-xl font-bold hover:bg-gray-200 transition inline-flex items-center">
              <span>Solicitar contato</span>
              <span className="ml-2 inline-block">→</span>
            </button>
          </motion.div>
        </div>
      </div> */}

      <Footer />
    </div>
  );
}
