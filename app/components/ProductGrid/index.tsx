"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/collections/page";

interface Props {
  products: Product[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product} index={index} />
      ))}
    </div>
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
      <Link href={`/products/${product.slug.current}`}>
        <div
          className="relative overflow-hidden h-[600px] bg-white/5 border border-white/10 shadow-xl hover:border-primary transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative h-full overflow-hidden">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
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

export default ProductGrid;
