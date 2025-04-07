"use client";

import ProductGrid from "../components/ProductGrid";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function ProductsPage() {
  return (
    <div className="bg-black text-white min-h-screen w-full">
      <Navbar />

      <main className="relative z-10 w-[95%]  mx-auto  py-12">
        {/* Products Display */}
        <ProductGrid />

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center gap-2 mt-16"
        >
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                page === 1
                  ? "bg-primary text-white"
                  : "bg-white/10 hover:bg-white/20 text-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
    </div>
  );
}
