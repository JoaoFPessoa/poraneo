"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Banner({}) {
  return (
    <motion.div className="relative  w-full shadow-md  h-screen flex items-center justify-center">
      {/* background */}
      <Image
        src="/banner-cover-2.jpg"
        alt="Banner art"
        fill
        className="max-w-full max-h-full"
        objectFit="cover"
      />
      {/* logo */}
      <Image
        height={400}
        className="absolute left-0 top-[84px] px-12 h-[80px] w-fit md:left-[56px] md:top-[56px]"
        width={400}
        src="/logo/yellow-no-bg.png"
        alt="Chair"
      />
    </motion.div>
  );
}
