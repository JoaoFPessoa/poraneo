"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { Calendar, User } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "next-sanity";

export interface BlogPost {
  _id: string;
  slug: {
    current: string;
    _type: string;
  };
  title: string;
  publishedAt: string;
  mainImage: {
    alt: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  author: {
    name: string;
    image?: string;
  };
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  slug,
  title,
  publishedAt,
  mainImage,
  body,
  author->{name}
}`;
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default function BlogPostDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [blogPost, setBlogPost] = useState<BlogPost>({} as BlogPost);
  const [imageUrl, setImageUrl] = useState<string | null | undefined>("");

  async function handleGetPost() {
    const response = await client.fetch<BlogPost>(
      POST_QUERY,
      await params,
      options
    );
    setBlogPost(response);

    const postImageUrl = response.mainImage
      ? urlFor(response.mainImage)?.width(550).height(310).url()
      : null;
    setImageUrl(postImageUrl);
  }

  useEffect(() => {
    handleGetPost();
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

  // Format date
  const formattedDate = new Date(blogPost.publishedAt).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Blog Post Header */}
      <header className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10" />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={blogPost.title}
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        )}
        <div className="relative z-20 h-full flex flex-col justify-end px-6 pb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-6">
              {blogPost.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <User size={18} className="text-amber-400" />
                <span>{blogPost.author?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-amber-400" />
                <span>{formattedDate}</span>
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
          <p className="mb-6 text-gray-300 leading-relaxed">
            {Array.isArray(blogPost.body) && (
              <PortableText value={blogPost.body} />
            )}
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
