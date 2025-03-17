"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
  price: string;
  additionalInfo: string;
}

export function ProductsCard({
  imageSrc,
  title,
  description,
  price,
  additionalInfo,
  id,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-full  mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className=" p-6">
        <div className="relative w-full pt-[100%]  overflow-hidden rounded-lg">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            layout="fill"
            objectFit="cover"
            className={`transition-transform duration-300 ease-in-out ${
              isHovered && "scale-110"
            }`}
          />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div
          className="mt-2 overflow-hidden transition-all  duration-300 ease-in-out"
          style={{ maxHeight: isHovered ? "100px" : "0" }}
        >
          <p className="text-sm text-gray-500">{additionalInfo}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold">{price}</span>
        <Link href={`/products/${id}`}>
          <Button className="hover:bg-black/80 mt-2 bg-black text-white px-4 py-2 rounded">
            Ver Detalhes
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
