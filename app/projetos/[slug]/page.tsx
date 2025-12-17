"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Lenis from "lenis";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import CTAButton from "@/components/ui/CTAButton";

// Tipos
interface Project {
  _id: string;
  _createdAt: string;
  name: string;
  slug: {
    _type: "slug";
    current: string;
  };
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  description?: string;
  local?: string;
  ano?: string;
  tipo?: string;
  extra_images?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  }[];
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [project, setProject] = useState<Project | null>(null);

  async function getProjectBySlug(slug: string) {
    const query = `*[_type == "projects" && slug.current == $slug][0]`;
    const response = await client.fetch(query, { slug });
    return response;
  }

  const { projectId, dataset } = client.config();
  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  useEffect(() => {
    getProjectBySlug(params.slug).then((data) => {
      setProject(data);
    });
  }, [params.slug]);

  useEffect(() => {
    // Inicializa o scroll suave
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black text-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-8 border border-white/20 rounded-lg backdrop-blur-lg"
        >
          Projeto não encontrado
        </motion.div>
      </div>
    );
  }

  const allImages = [...(project.extra_images ?? [])].filter(
    (img) => img && img.asset && img.asset._ref
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center text-sm text-black/60">
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/projetos"
            className="hover:text-amber-300 transition-colors"
          >
            Projetos
          </Link>
          <span className="mx-2">/</span>
          <span className="text-amber-300">{project.name}</span>
        </div>
      </div>

      {/* Header do Projeto */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <span className="text-amber-500 uppercase tracking-wider text-sm mb-3 block">
              {project.tipo === "expografia"
                ? "Expografia"
                : "Projeto Arquitetônico"}
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-2">
              {project.name}
            </h1>
          </div>

          <div className="flex gap-6 items-center">
            <div className="text-right">
              <span className="block text-black text-sm">Localização</span>
              <span className="block text-black/70 mt-1">{project.local}</span>
            </div>
            <div className="text-right">
              <span className="block text-black text-sm">Ano</span>
              <span className="block text-black/70 mt-1">{project.ano}</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Coluna de Imagens */}
          <div className="lg:col-span-2">
            {/* Imagem Principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 shadow-xl mb-6"
            >
              <Image
                src={
                  allImages[activeImage]
                    ? (urlFor(allImages[activeImage])
                        ?.width(550)
                        .dpr(2)
                        .height(310)
                        .quality(100)
                        .url() ?? "/placeholder.svg")
                    : "/placeholder.svg"
                }
                alt={project.name}
                layout="fill"
                objectFit="cover"
                className="transition-all duration-700 hover:scale-105"
              />
            </motion.div>

            {/* Galeria */}
            {allImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl font-light tracking-wider mb-4">
                  Galeria
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {project.image?.asset?._ref && (
                    <div
                      className={`relative aspect-square rounded overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                        activeImage === 0
                          ? "border-amber-500"
                          : "border-transparent hover:border-amber-500/50"
                      }`}
                      onClick={() => setActiveImage(0)}
                    >
                      <Image
                        src={urlFor(project.image)?.url() || "/placeholder.svg"}
                        alt="Capa"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}

                  {allImages.map((img, index) => (
                    <div
                      key={index}
                      className={`relative aspect-square rounded overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                        activeImage === index
                          ? "border-amber-500"
                          : "border-transparent hover:border-amber-500/50"
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <Image
                        src={
                          urlFor(img)
                            ?.width(500)
                            .height(500)
                            .quality(100)
                            .url() ?? "/placeholder.svg"
                        }
                        alt={`Detalhe ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Coluna de Informações */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Descrição */}
              <div>
                <h3 className="text-xl font-light tracking-wider mb-4">
                  Sobre o Projeto
                </h3>
                <div className="text-black/50 font-light space-y-4">
                  {project.description}
                </div>
              </div>

              {/* CTA */}
              <div>
                <CTAButton />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
