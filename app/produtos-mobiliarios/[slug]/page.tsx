"use client";

import Image from "next/image";
import Footer from "../../components/Footer";
import Navbar from "@/app/components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import CTAButton from "@/components/ui/CTAButton";

interface Product {
  _id: string;
  _createdAt: string;
  name: string;
  slug: {
    _type: "slug";
    current: string;
  };
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  description?: string;
  additionalInfo?: string;
  collection?: string;
  technicalDescription?: string;
  dimensions?: string;
  specifications?: string;
  extra_images?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  }[];
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [product, setProduct] = useState<Product | null>(null);

  async function getProductBySlug(slug: string) {
    const query = `*[_type == "product" && slug.current == $slug][0]`;
    const response = await client.fetch(query, { slug });
    return response;
  }

  const { projectId, dataset } = client.config();
  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  useEffect(() => {
    getProductBySlug(params.slug).then((data) => {
      setProduct(data);
    });
  }, [params.slug]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black text-2xl">
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

  const allImages = [...(product.extra_images ?? [])].filter(Boolean);

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* Hero Section com Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: `url(${urlFor(product.image || "")
              ?.width(1200)
              .quality(100)
              .url()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
            transform: scrolled ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.5s ease-out",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-20 container max-w-7xl mx-auto px-6 h-full flex flex-col justify-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-6xl md:text-8xl font-black leading-tight tracking-tight"
          >
            {product.name}
          </motion.h1>
        </motion.div>

        <div className="absolute bottom-36 left-0 right-0 z-20 flex justify-center">
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
        <div className="absolute bottom-36 left-0 right-0 z-20 flex justify-center">
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
                stroke="black"
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
                  src={
                    allImages[activeImageIndex] &&
                    (urlFor(allImages[activeImageIndex])
                      ?.width(700)
                      .dpr(2)
                      .height(600)
                      .quality(100)
                      .url() ??
                      "/placeholder.svg")
                  }
                  alt={product.name}
                  fill
                  objectPosition="center"
                  objectFit="cover"
                  className="transition hover:scale-105 duration-700"
                  quality={100}
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
                    src={
                      urlFor(img)?.width(500).height(500).quality(100).url() ??
                      "/placeholder.svg"
                    }
                    alt={`${product.name} thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg hover:opacity-80 transition"
                    quality={100}
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
            className="flex flex-col justify-start"
          >
            <div className="space-y-6">
              <div>
                <p className="text-xl text-black/50 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <CTAButton />
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
