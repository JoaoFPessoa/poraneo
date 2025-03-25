"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";

// Types
interface BlogPost {
  _id: string;
  slug: {
    current: string;
    _type: string;
  };
  title: string;
  publishedAt: string;
  mainImage: string;
  author: {
    name: string;
    image?: string;
  };
}
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  "mainImage": mainImage.asset->url,
  "author": author->{
    name,
    "image": image.asset->url
  }
}`;

const options = { next: { revalidate: 30 } };

export default function BlogPage() {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  async function handleGetPosts() {
    const response = await client.fetch<SanityDocument[]>(
      POSTS_QUERY,
      {},
      options
    );
    setPosts(response);
  }

  useEffect(() => {
    handleGetPosts();
  }, []);

  useEffect(() => {
    // Smooth scrolling
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  console.log({ posts });
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Page Header */}
      <header className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/blog-header.jpg')" }}
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-light tracking-wider mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nosso Blog
          </motion.h1>
          <motion.div
            className="w-24 h-px bg-amber-500/70 mb-4"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.p
            className="max-w-2xl text-gray-300 font-light italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Insights, inspirações e histórias do universo do design e
            arquitetura
          </motion.p>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {posts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

const BlogPostCard: React.FC<{ post: BlogPost; index: number }> = ({
  post,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format date
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug.current}`}>
        <div
          className="relative overflow-hidden rounded-lg bg-black/20 border border-white/10 shadow-2xl hover:border-amber-500/40 transition-all duration-700"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative h-80 overflow-hidden">
            <Image
              src={post.mainImage || "/placeholder.svg"}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className={`transition-all duration-1000 ${
                isHovered ? "scale-105 brightness-90" : "brightness-100"
              }`}
            />

            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ${
                isHovered ? "opacity-80" : "opacity-60"
              }`}
            />

            {/* Author and Read Time */}
            <div className="absolute top-6 left-6 right-6 ">
              <div className="w-fit flex items-center gap-2">
                {post.author.image && (
                  <Image
                    src={post.author.image}
                    alt={`Foto de ${post.author.name}`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                )}
                <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-amber-100 uppercase tracking-wider border border-amber-500/20">
                  {post.author.name}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className="absolute left-6 top-20">
              <span className="text-gray-300 text-sm font-light">
                {formattedDate}
              </span>
            </div>

            {/* Post Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
              <div className="relative">
                <div className="absolute -left-4 top-2 w-1 h-8 bg-gradient-to-b from-amber-300 to-amber-600"></div>

                <h3 className="text-2xl font-light text-white mb-2 line-clamp-2 tracking-wider pl-1">
                  {post.title}
                </h3>
              </div>

              <div
                className={`overflow-hidden transition-all duration-700 ${
                  isHovered ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-300 line-clamp-3 mb-5 text-sm font-light">
                  DASAS
                </p>
                <div className="relative group overflow-hidden inline-flex items-center gap-3">
                  <span className="text-amber-300 text-sm uppercase tracking-wider font-light">
                    Ler Artigo
                  </span>
                  <span className="w-8 h-px bg-amber-400/50 transition-all duration-300 group-hover:w-12"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
