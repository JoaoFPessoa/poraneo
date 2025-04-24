"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { productsMock } from "@/data/productsMock";

const ProductSection = () => {
  return (
    <div className="bg-[#F5F5DC] py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Nossa Coleção
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsMock.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 font-bold">{product.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-gray-700 transition duration-300"
                >
                  Adicionar ao Carrinho
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
