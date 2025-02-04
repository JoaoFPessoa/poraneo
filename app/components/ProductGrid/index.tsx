"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react"; // Added import for React
import { productsMock } from "@/data/productsMock";

interface ProductGridProps {
  category: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ category }) => {
  const filteredProducts =
    category === "Todas"
      ? productsMock
      : productsMock.filter((product) => product.category === category);

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product) => (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          key={product.id}
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <Link href={`/produtos/${product.id}`}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={800}
              className="w-full h-[80vh] object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 font-bold">{product.price}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
