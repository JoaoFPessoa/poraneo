"use client";

import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import CollectionGrid from "../components/CollectionGrid";
import Footer from "../components/Footer";

export type Collection = {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  slug: { current: string };
};

const COLLECTIONS_PER_PAGE = 6;

const getPaginatedCollectionsQuery = (start: number, end: number) => `
  *[_type == "collections"] [${start}...${end}] {
    _id,
    name,
    image,
    description,
    "imageUrl": image.asset->url,
    slug
  }
`;

const getTotalProductsQuery = `
  count(*[_type == "collections"])
`;

export default function CollectionsPage() {
  const [products, setProducts] = useState<Collection[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const totalPages = Math.ceil(totalProducts / COLLECTIONS_PER_PAGE);

  useEffect(() => {
    const fetchTotal = async () => {
      const count = await client.fetch(getTotalProductsQuery);
      setTotalProducts(count);
    };
    fetchTotal();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * COLLECTIONS_PER_PAGE;
    const end = start + COLLECTIONS_PER_PAGE;

    const fetchProducts = async () => {
      const data = await client.fetch(
        getPaginatedCollectionsQuery(start, end),
        {},
        { next: { revalidate: 30 } }
      );
      setProducts(data);
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <div className="bg-white text-black min-h-screen w-full">
      <Navbar />

      <main className="relative z-10 w-[95%] mx-auto py-12">
        <CollectionGrid collections={products} />

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
      </main>
      <Footer />
    </div>
  );
}
