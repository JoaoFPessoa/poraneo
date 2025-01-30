"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AnimatedProductCardProps {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
  additionalInfo?: string;
}

export function AnimatedProductCard({
  imageSrc,
  title,
  description,
  price,
  additionalInfo,
}: AnimatedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Card
      className="w-full max-w-sm mx-auto transition-all duration-300 ease-in-out transform hover:shadow-lg"
      style={{
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        backgroundColor: isHovered ? "var(--card-hovered)" : "var(--card)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={cardRef}
    >
      <CardContent className="p-4">
        <div className="relative w-full pt-[100%] overflow-hidden rounded-lg">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div
          className="mt-2 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: isHovered ? "100px" : "0" }}
        >
          <p className="text-sm text-gray-500">{additionalInfo}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold">{price}</span>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
