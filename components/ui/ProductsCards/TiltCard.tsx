"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
}

export function TiltCard({
  imageSrc,
  title,
  description,
  price,
}: ProductCardProps) {
  const [tiltStyle, setTiltStyle] = useState({});
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiltElement = tiltRef.current;
    if (!tiltElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = tiltElement.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      const tiltX = (y - 0.5) * 20; // Tilt up to 20 degrees
      const tiltY = (x - 0.5) * -20; // Tilt up to 20 degrees

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`,
        transition: "none",
      });
    };

    const handleMouseLeave = () => {
      setTiltStyle({
        transform:
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "all 0.5s ease",
      });
    };

    tiltElement.addEventListener("mousemove", handleMouseMove);
    tiltElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tiltElement.removeEventListener("mousemove", handleMouseMove);
      tiltElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Card className=" w-full max-w-sm mx-auto">
      <CardContent className="p-4">
        <div
          ref={tiltRef}
          className="relative w-full pt-[100%] overflow-hidden rounded-lg"
          style={tiltStyle}
        >
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold">{price}</span>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
