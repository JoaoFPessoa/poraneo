"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { client } from "@/sanity/lib/client";
import CTAButton from "@/components/ui/CTAButton";

// Tipos
interface Project {
  id: string;
  name: string;
  slug: { current: string };
  description: string;
  imageUrl: string;
  local: string;
  ano: string;
  tipo: "expografia" | "arquitetura";
}

const PROJECTS_PER_PAGE = 6;

const getPaginatedProjectsQuery = (start: number, end: number) => `
  *[_type == "projects"] [${start}...${end}] {
    _id,
    name,
    image,
    description,
    local,
    ano,
    tipo,
    "imageUrl": image.asset->url,
    slug
  }
`;

const getTotalProjectsQuery = `
  count(*[_type == "projects"])
`;

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"expografia" | "arquitetura">(
    "expografia"
  );

  const [projects, setProjects] = useState<Project[]>();
  const [totalProjects, setTotalProjects] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE);

  useEffect(() => {
    const fetchTotal = async () => {
      const count = await client.fetch(getTotalProjectsQuery);
      setTotalProjects(count);
    };
    fetchTotal();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    const end = start + PROJECTS_PER_PAGE;

    const fetchProducts = async () => {
      const data = await client.fetch(
        getPaginatedProjectsQuery(start, end),
        {},
        { next: { revalidate: 30 } }
      );
      setProjects(data);
    };

    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    // Scroll suave
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, [activeTab]);
  console.log(projects, activeTab);
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
            {projects
              ?.filter((project) => project.tipo === activeTab)
              .map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
          </motion.div>
        </AnimatePresence>
        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center gap-2 mt-16"
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-white/10 hover:bg-white/20 text-gray-800"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center w-fit mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 max-w-2xl mx-auto mb-8 font-light">
            Interessado em desenvolver um projeto exclusivo com nossa equipe?
          </p>
          <CTAButton />
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
  console.log({ project });
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/projetos/${project.slug.current}`}>
        <div
          className="relative overflow-hidden h-[600px] bg-white/5 border border-white/10 shadow-xl hover:border-primary transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative h-full overflow-hidden">
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.name}
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
                {project.local}
              </span>
              <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-white uppercase tracking-wider">
                {project.ano}
              </span>
            </div>

            {/* Info do projeto */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 tracking-wider pl-1">
                  {project.name}
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
