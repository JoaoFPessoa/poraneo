"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type React from "react";
import { productsMock } from "@/data/productsMock";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/product";

interface ProductGridProps {
  category: string;
  isGridView?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  category,
  isGridView = true,
}) => {
  const filteredProducts =
    category === "Todas"
      ? productsMock
      : productsMock.filter((product) => product.category === category);

  return (
    <>
      {isGridView ? (
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-full gap-6">
          {filteredProducts.map((product, index) => (
            <ProductListItem key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </>
  );
};

const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div
          className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-xl hover:border-primary transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative h-80 overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
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


            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-xs font-medium text-white">
                {product.category}
              </span>
            </div>

            {/* Title & Info - Over Image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
              <h3 className="text-2xl font-bold text-white mb-1 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-primary font-bold mb-2">{product.price}</p>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isHovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-300 line-clamp-2 mb-4 text-sm">
                  {product.description}
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

const ProductListItem = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="flex flex-col md:flex-row gap-6 p-4 rounded-2xl  hover:border-primary-500/50 transition-all duration-300 overflow-hidden">
          {/* Image */}
          <div className="relative h-60 md:w-64 md:h-48 overflow-hidden rounded-xl">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-xs font-medium text-white">
                {product.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="text-primary font-bold">{product.price}</p>
              </div>
              <p className="text-gray-300 mt-2 line-clamp-2">
                {product.description}
              </p>

              {/* Details/Features */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {(
                  product.specifications || [
                    "Customizável",
                    "Design exclusivo",
                    "Garantia de qualidade",
                  ]
                )
                  .slice(0, 4)
                  .map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center text-sm text-gray-400"
                    >
                      <svg
                        className="w-4 h-4 mr-1.5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <button className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm font-medium transition flex items-center gap-2">
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
      </Link>
    </motion.div>
  );
};

export default ProductGrid;
