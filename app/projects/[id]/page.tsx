"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Lenis from "lenis";

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
  fullDescription?: string;
  gallery?: string[];
  materials?: string[];
  dimensions?: string;
  team?: string[];
}

// Dados mockados expandidos para os projetos
const projectsData: Project[] = [
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
    fullDescription:
      "A exposição 'Madeira Brasileira' representa um marco na valorização das matérias-primas nacionais através de um projeto expográfico meticulosamente desenvolvido. O conceito central foi criar uma experiência imersiva onde o próprio mobiliário expositivo se torna parte da narrativa sobre a riqueza e diversidade das madeiras brasileiras.\n\nTrabalhamos com técnicas tradicionais de marcenaria combinadas com tecnologia de ponta para criar estruturas que destacam as propriedades naturais de cada espécie de madeira utilizada. A iluminação foi cuidadosamente planejada para valorizar os veios, texturas e tonalidades das madeiras nobres, criando um diálogo constante entre as obras expostas e os suportes que as abrigam.\n\nO projeto foi desenvolvido respeitando princípios de sustentabilidade, utilizando apenas madeiras certificadas e de manejo responsável, alinhando assim a mensagem da exposição com sua execução prática.",
    gallery: [
      "/projects/expo-1-detail-1.jpg",
      "/projects/expo-1-detail-2.jpg",
      "/projects/expo-1-detail-3.jpg",
      "/projects/expo-1-detail-4.jpg",
      "/projects/expo-1-detail-5.jpg",
    ],
    materials: [
      "Ipê",
      "Jatobá",
      "Freijó",
      "Peroba Rosa",
      "Vidro temperado",
      "Iluminação LED com temperatura controlada",
    ],
    dimensions:
      "Área total de 450m², com módulos expositivos variando entre 2.1m e 3.5m de altura",
    team: [
      "Direção de Arte: Maria Oliveira",
      "Projeto Expográfico: Studio Madeira Viva",
      "Execução: Marcenaria de Precisão",
      "Iluminação: Luis Técnico",
    ],
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
    fullDescription:
      "A 'Mostra Contemporânea' desafiou o estúdio a criar um mobiliário expositivo discreto, porém marcante, que permitisse o protagonismo das obras de arte contemporânea sem deixar de ter personalidade própria. O resultado foi uma série de estruturas que combinam a robustez da madeira cumaru com a delicadeza dos detalhes em latão envelhecido.\n\nO projeto foi concebido para estabelecer um diálogo harmonioso entre as peças expostas e seu entorno. Os suportes expositivos apresentam uma geometria minimalista, complementada por detalhes metálicos que criam pontos de interesse visual sem competir com as obras.\n\nUm sistema modular foi desenvolvido especialmente para esta exposição, permitindo diferentes configurações espaciais conforme a necessidade curatorial. Isso proporcionou grande flexibilidade ao projeto, possibilitando adaptações ao longo do período expositivo.",
    gallery: [
      "/projects/expo-2-detail-1.jpg",
      "/projects/expo-2-detail-2.jpg",
      "/projects/expo-2-detail-3.jpg",
      "/projects/expo-2-detail-4.jpg",
    ],
    materials: [
      "Madeira Cumaru",
      "Latão envelhecido",
      "Aço carbono com pintura eletrostática",
      "Vidro anti-reflexo",
    ],
    dimensions: "Área expositiva de 320m², com 18 módulos adaptáveis",
    team: [
      "Curadoria: Carlos Mendes",
      "Projeto Expográfico: Studio Madeira Viva",
      "Metalurgia: Atelier Metal & Arte",
      "Montagem: Equipe Instituto Cultural",
    ],
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
    fullDescription:
      "Este projeto residencial em Alto de Pinheiros representa a fusão perfeita entre funcionalidade, estética e o calor insubstituível da madeira nobre brasileira. Fomos responsáveis pelo desenvolvimento e execução de todo o projeto de marcenaria, trabalhando em estreita colaboração com os arquitetos responsáveis pelo projeto arquitetônico.\n\nO destaque fica por conta dos impressionantes painéis em madeira freijó, que revestem paredes inteiras e criam uma atmosfera acolhedora e sofisticada. As portas pivotantes de 3 metros de altura foram desenvolvidas com um sistema especial que garante movimento suave apesar do peso considerável das peças.\n\nTodo o mobiliário foi desenhado sob medida para atender às necessidades específicas dos moradores, considerando aspectos ergonômicos, estéticos e de durabilidade. A paleta de cores foi cuidadosamente selecionada para complementar os tons dourados e amarronzados do freijó, criando um ambiente de elegância atemporal.",
    gallery: [
      "/projects/arch-1-detail-1.png",
      "/projects/arch-1-detail-2.png",
      "/projects/arch-1-detail-3.png",
      "/projects/arch-1-detail-4.png",
      "/projects/arch-1-detail-5.png",
      "/projects/arch-1-detail-6.png",
    ],
    materials: [
      "Madeira Freijó",
      "Latão escovado",
      "Vidro fumê",
      "Couro natural",
      "Ferragens importadas",
    ],
    dimensions:
      "400m² de área útil com intervenções em todos os ambientes sociais e íntimos",
    team: [
      "Arquitetura: Studio AG Arquitetura",
      "Marcenaria: Studio Madeira Viva",
      "Iluminação: Light Design",
      "Paisagismo: Verde & Cia",
    ],
  },
];

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [project, setProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicializa o scroll suave
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Busca o projeto com base no id
    const foundProject = projectsData.find((p) => p.id === id);

    if (foundProject) {
      setProject(foundProject);
      setActiveImage(foundProject.image);
      setLoading(false);
    } else {
      // Redireciona para a página de projetos se o projeto não for encontrado
      router.push("/projetos");
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-2 border-amber-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-amber-100 font-light">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center text-sm text-gray-400">
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/projects"
            className="hover:text-amber-300 transition-colors"
          >
            Projetos
          </Link>
          <span className="mx-2">/</span>
          <span className="text-amber-300">{project.title}</span>
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
              {project.category === "expografia"
                ? "Projeto Expográfico"
                : "Projeto Arquitetônico"}
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-2">
              {project.title}
            </h1>
            <p className="text-gray-300 font-light">{project.client}</p>
          </div>

          <div className="flex gap-6 items-center">
            <div className="text-right">
              <span className="block text-gray-400 text-sm">Localização</span>
              <span className="block text-white mt-1">{project.location}</span>
            </div>
            <div className="text-right">
              <span className="block text-gray-400 text-sm">Ano</span>
              <span className="block text-white mt-1">{project.year}</span>
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
                src={activeImage}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="transition-all duration-700 hover:scale-105"
              />
            </motion.div>

            {/* Galeria */}
            {project.gallery && project.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl font-light tracking-wider mb-4">
                  Galeria
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  <div
                    className={`relative aspect-square rounded overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                      activeImage === project.image
                        ? "border-amber-500"
                        : "border-transparent hover:border-amber-500/50"
                    }`}
                    onClick={() => setActiveImage(project.image)}
                  >
                    <Image
                      src={project.image}
                      alt="Capa"
                      layout="fill"
                      objectFit="cover"
                      className={`transition-all duration-300 ${
                        activeImage === project.image
                          ? "brightness-100"
                          : "brightness-75 hover:brightness-100"
                      }`}
                    />
                  </div>

                  {project.gallery.map((img, index) => (
                    <div
                      key={index}
                      className={`relative aspect-square rounded overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                        activeImage === img
                          ? "border-amber-500"
                          : "border-transparent hover:border-amber-500/50"
                      }`}
                      onClick={() => setActiveImage(img)}
                    >
                      <Image
                        src={img}
                        alt={`Detalhe ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className={`transition-all duration-300 ${
                          activeImage === img
                            ? "brightness-100"
                            : "brightness-75 hover:brightness-100"
                        }`}
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
                <div className="text-gray-300 font-light space-y-4">
                  {project.fullDescription
                    ?.split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>

              {/* Materiais */}
              {project.materials && project.materials.length > 0 && (
                <div>
                  <h3 className="text-xl font-light tracking-wider mb-4">
                    Materiais
                  </h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {project.materials.map((material, index) => (
                      <li
                        key={index}
                        className="flex gap-3 items-start text-gray-300"
                      >
                        <span className="text-amber-500 mt-1">•</span>
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dimensões */}
              {project.dimensions && (
                <div>
                  <h3 className="text-xl font-light tracking-wider mb-4">
                    Dimensões
                  </h3>
                  <p className="text-gray-300 font-light">
                    {project.dimensions}
                  </p>
                </div>
              )}

              {/* Equipe */}
              {project.team && project.team.length > 0 && (
                <div>
                  <h3 className="text-xl font-light tracking-wider mb-4">
                    Equipe
                  </h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {project.team.map((member, index) => (
                      <li
                        key={index}
                        className="flex gap-3 items-start text-gray-300"
                      >
                        <span className="text-amber-500 mt-1">•</span>
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="pt-6">
                <h3 className="text-xl font-light tracking-wider mb-4">
                  Interessado?
                </h3>
                <p className="text-gray-300 font-light mb-6">
                  Entre em contato para discutir seu próximo projeto ou tirar
                  dúvidas sobre nossos serviços.
                </p>
                <Link
                  href="/contato"
                  className="relative overflow-hidden group inline-flex items-center gap-3 px-8 py-4 bg-amber-800/20 backdrop-blur-sm border border-amber-500/40 text-amber-100 text-sm uppercase tracking-widest transition-all duration-500 hover:bg-amber-800/40"
                >
                  <span className="relative z-10 group-hover:text-amber-50 transition-colors duration-300">
                    Solicitar Orçamento
                  </span>
                  <span className="w-6 h-px bg-amber-400/50 transition-all duration-300 group-hover:w-10"></span>
                  <span className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-r from-amber-700/40 to-amber-500/40 transition-all duration-500 group-hover:h-full"></span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navegação para outros projetos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 pt-12 border-t border-white/10"
        >
          <h3 className="text-2xl font-light tracking-wider mb-8 text-center">
            Outros Projetos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData
              .filter((p) => p.id !== id)
              .slice(0, 3)
              .map((relatedProject) => (
                <Link
                  href={`/projects/${relatedProject.id}`}
                  key={relatedProject.id}
                >
                  <div className="group relative rounded-lg overflow-hidden border border-white/10 transition-all duration-500 hover:border-amber-500/40">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-amber-300 text-sm uppercase tracking-wider block mb-2">
                        {relatedProject.category === "expografia"
                          ? "Expografia"
                          : "Arquitetura"}
                      </span>
                      <h4 className="text-xl font-light text-white tracking-wider group-hover:text-amber-100 transition-colors duration-300">
                        {relatedProject.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
