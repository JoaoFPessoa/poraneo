"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
  additionalInfo: string;
  id: number;
}

export function RevealInfoCard({
  imageSrc,
  title,
  description,
  price,
  additionalInfo,
  id,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
      <Card
        className="max-w-sm mx-auto bg-[#181818] border border-[#333]  shadow-lg overflow-hidden transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-5">
          {/* Imagem do produto */}
          <div className="relative w-full pt-[100%] overflow-hidden rounded-lg">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Título e descrição */}
          <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-gray-400">{description}</p>

          {/* Informações adicionais com efeito de expansão */}
          <motion.div
            animate={{ maxHeight: isHovered ? "100px" : "0px" }}
            className="mt-2 overflow-hidden transition-all duration-300"
          >
            <p className="text-sm text-gray-500">{additionalInfo}</p>
          </motion.div>
        </CardContent>

        {/* Rodapé com preço e botão */}
        <CardFooter className="flex justify-between items-center p-5">
          <span className="text-lg font-bold text-white">{price}</span>
          <Link href={`/products/${id}`}>
            <Button className="hover:bg-black/80 mt-2 bg-black text-white px-4 py-2 rounded">
              Ver Detalhes
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
