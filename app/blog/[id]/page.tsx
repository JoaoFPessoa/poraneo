"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { Clock, Calendar, User, ArrowRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Types
interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
  image: string;
  content: string[];
  excerpt: string;
}

// Mock Blog Post Data
const blogPost: BlogPost = {
  id: "post-1",
  title: "A Arte da Marcenaria Contemporânea",
  author: "João Silva",
  date: "2024-03-15",
  readTime: 5,
  category: "Design",
  image: "/blog/blog-1.png",
  excerpt:
    "Explorando as intersecções entre design tradicional e inovação tecnológica na marcenaria moderna, revelando como técnicas ancestrais se encontram com processos contemporâneos.",
  content: [
    "A marcenaria tem sido uma arte milenar que constantemente se reinventa. No cenário contemporâneo, observamos uma transformação fascinante onde técnicas tradicionais se entrelaçam com tecnologias de ponta, criando peças que são verdadeiras obras de arte funcional.",
    "Hoje, os marceneiros não são apenas artesãos, mas também designers, engenheiros e artistas. Eles combinam conhecimento ancestral com ferramentas de precisão digital, como modelagem 3D e máquinas CNC, que permitem níveis de precisão e complexidade antes inimagináveis.",
    "Um dos aspectos mais interessantes desta nova era da marcenaria é a crescente preocupação com sustentabilidade. Designers estão cada vez mais focados em selecionar madeiras de reflorestamento, desenvolver técnicas de menor impacto ambiental e criar peças que sejam não apenas belas, mas também eticamente responsáveis.",
    "As novas tecnologias também permitem uma personalização sem precedentes. Clientes podem colaborar diretamente com marceneiros para criar móveis que são verdadeiramente únicos, refletindo não apenas necessidades funcionais, mas também narrativas pessoais e expressões artísticas individuais.",
  ],
};

// Related Posts
const relatedPosts = [
  {
    id: "post-2",
    title: "Madeiras Brasileiras: Um Patrimônio Sustentável",
    image: "/blog/blog-1.png",
    date: "2024-02-28",
  },
  {
    id: "post-3",
    title: "Arquitetura Minimalista em Madeira",
    image: "/blog/blog-1.png",
    date: "2024-01-20",
  },
];

export default function BlogPostDetail() {
  useEffect(() => {
    // Smooth scrolling
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // Format date
  const formattedDate = new Date(blogPost.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Blog Post Header */}
      <header className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <Image
          src={blogPost.image}
          alt={blogPost.title}
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div className="relative z-20 h-full flex flex-col justify-end px-6 pb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-amber-100 uppercase tracking-wider border border-amber-500/20 inline-block mb-4">
              {blogPost.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-6">
              {blogPost.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <User size={18} className="text-amber-400" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-amber-400" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={18} className="text-amber-400" />
                <span>{blogPost.readTime} min de leitura</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl text-gray-300 italic mb-10 leading-relaxed">
            {blogPost.excerpt}
          </p>

          {blogPost.content.map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Related Posts */}
      <div className="max-w-6xl mx-auto px-6 py-16 border-t border-white/10">
        <h2 className="text-3xl font-light tracking-wider mb-10 text-center">
          Artigos Relacionados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {relatedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-105 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-light text-white mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-gray-300 text-sm">
                    <span>
                      {new Date(post.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span>Ler Artigo</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
