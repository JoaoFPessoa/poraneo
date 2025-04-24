"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Tipos
interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  image: string;
  location: string;
  year: string;
  category: "expografia" | "arquitetura";
}

// Dados mockados para os projetos
const projectsMock: Project[] = [
  {
    id: "exp-1",
    title: "Exposição Madeira Brasileira",
    client: "Museu de Arte Moderna",
    description:
      "Expografia completa com peças em madeiras nobres brasileiras, destacando a riqueza natural do país através de formas orgânicas e acabamentos sofisticados.",
    image: "/projects/expo-1-cover.jpg",
    location: "São Paulo, SP",
    year: "2024",
    category: "expografia",
  },
  {
    id: "exp-2",
    title: "Mostra Contemporânea",
    client: "Instituto Cultural",
    description:
      "Mobiliário expositivo criado para destacar obras de arte contemporânea, utilizando madeira cumaru e detalhe em latão envelhecido.",
    image: "/projects/expo-2-cover.jpg",
    location: "Rio de Janeiro, RJ",
    year: "2023",
    category: "expografia",
  },
  {
    id: "exp-3",
    title: "Mostra Contemporânea",
    client: "Instituto Cultural",
    description:
      "Mobiliário expositivo criado para destacar obras de arte contemporânea, utilizando madeira cumaru e detalhe em latão envelhecido.",
    image: "/projects/expo-2-cover.jpg",
    location: "Rio de Janeiro, RJ",
    year: "2023",
    category: "expografia",
  },
  {
    id: "exp-4",
    title: "Mostra Contemporânea",
    client: "Instituto Cultural",
    description:
      "Mobiliário expositivo criado para destacar obras de arte contemporânea, utilizando madeira cumaru e detalhe em latão envelhecido.",
    image: "/projects/expo-2-cover.jpg",
    location: "Rio de Janeiro, RJ",
    year: "2023",
    category: "expografia",
  },
  {
    id: "arq-1",
    title: "Residência Alto de Pinheiros",
    client: "Cliente Particular",
    description:
      "Projeto completo de marcenaria para residência de luxo, incluindo painéis de madeira freijó, mobiliário sob medida e portas pivotantes de 3 metros.",
    image: "/projects/arch-1-cover.png",
    location: "São Paulo, SP",
    year: "2024",
    category: "arquitetura",
  },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"expografia" | "arquitetura">(
    "expografia"
  );
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Filtra os projetos baseado na aba ativa
    setFilteredProjects(
      projectsMock.filter((project) => project.category === activeTab)
    );

    // Scroll suave
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      {/* Header da página */}

      {/* Navegação entre abas */}
      <div className="mx-auto px-6 py-8">
        <nav className="border-b border-white/10 flex justify-center md:justify-start">
          <div className="flex gap-12">
            <TabButton
              isActive={activeTab === "expografia"}
              onClick={() => setActiveTab("expografia")}
            >
              Expografia
            </TabButton>
            <TabButton
              isActive={activeTab === "arquitetura"}
              onClick={() => setActiveTab("arquitetura")}
            >
              Arquitetura
            </TabButton>
          </div>
        </nav>
      </div>

      {/* Grid de projetos */}
      <div className=" mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 max-w-2xl mx-auto mb-8 font-light">
            Interessado em desenvolver um projeto exclusivo com nossa equipe?
          </p>
          <Link
            href="/contato"
            className="relative overflow-hidden group inline-block px-10 py-4 bg-amber-800/20 backdrop-blur-sm border border-amber-500/40 text-amber-700 text-sm  tracking-widest transition-all duration-500 hover:bg-amber-800/40"
          >
            <span className="relative z-10 group-hover:text-amber-50 transition-colors duration-300">
              entre em contato
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-r from-primary-500/80 to-primary-400/80 transition-all duration-500 group-hover:h-full"></span>
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

// Componente para botão de tab
const TabButton: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ children, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative pb-4 text-lg tracking-wide font-light transition-colors duration-300 ${
        isActive ? "text-amber-500" : "text-gray-600 hover:text-gray-400"
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-amber-500"
          layoutId="activeTab"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
};

// Componente de card para projeto
const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/projects/${project.id}`}>
        <div
          className="relative overflow-hidden h-[600px] bg-white/5 border border-white/10 shadow-xl hover:border-primary transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative h-full overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className={`transition-all duration-700 ${
                isHovered ? "scale-110 blur-sm" : ""
              }`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-60"
              }`}
            />
            {/* Local e Ano */}
            <div className="absolute top-6 left-6 right-6 flex justify-between">
              <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-amber-100 uppercase tracking-wider border border-amber-500/20">
                {project.location}
              </span>
              <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-white uppercase tracking-wider">
                {project.year}
              </span>
            </div>

            {/* Cliente */}
            <div className="absolute left-6 top-20">
              <span className="text-white text-sm font-light">
                {project.client}
              </span>
            </div>

            {/* Info do projeto */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 tracking-wider pl-1">
                  {project.title}
                </h3>
              </div>

              <div
                className={`overflow-hidden transition-all duration-700 ${
                  isHovered ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-300 line-clamp-3 mb-5 text-sm font-light">
                  {project.description}
                </p>
                <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 w-full justify-center">
                  <span>Ver detalhes</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
