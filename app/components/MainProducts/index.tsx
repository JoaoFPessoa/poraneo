import { RevealInfoCard } from "@/components/uiprodutos-mobiliariosCards/RevealInfoCard";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function MainProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -300px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 200 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className="relative max-w-7xl !text-white mt-24 mx-auto flex flex-col items-center"
    >
      <h1
        className="text-5xl p-6 w-fit font-semibold mb-8 text-center tracking-wide"
        style={{ boxShadow: "0px 4px 3px -1px rgba(0, 0, 0, 0.1)" }}
      >
        {" "}
        lançamentos
      </h1>
      <div className="flex flex-wrap gap-8">
        <RevealInfoCard
          id={1}
          imageSrc="/cadeira.webp"
          title="Running Shoes"
          description="Comfortable and lightweight for your daily run"
          price="$129.99"
          additionalInfo="Available in multiple sizes and colors. Features advanced cushioning technology for maximum comfort."
        />
        <RevealInfoCard
          id={2}
          imageSrc="/cadeira.webp"
          title="Running Shoes"
          description="Comfortable and lightweight for your daily run"
          price="$129.99"
          additionalInfo="Available in multiple sizes and colors. Features advanced cushioning technology for maximum comfort."
        />
        <RevealInfoCard
          id={3}
          imageSrc="/cadeira.webp"
          title="Running Shoes"
          description="Comfortable and lightweight for your daily run"
          price="$129.99"
          additionalInfo="Available in multiple sizes and colors. Features advanced cushioning technology for maximum comfort."
        />
        <RevealInfoCard
          id={4}
          imageSrc="/cadeira.webp"
          title="Running Shoes"
          description="Comfortable and lightweight for your daily run"
          price="$129.99"
          additionalInfo="Available in multiple sizes and colors. Features advanced cushioning technology for maximum comfort."
        />
        <RevealInfoCard
          id={5}
          imageSrc="/cadeira.webp"
          title="Running Shoes"
          description="Comfortable and lightweight for your daily run"
          price="$129.99"
          additionalInfo="Available in multiple sizes and colors. Features advanced cushioning technology for maximum comfort."
        />
        <RevealInfoCard
          id={6}
          imageSrc="/cadeira.webp"
          title="Running Shoes"
          description="Comfortable and lightweight for your daily run"
          price="$129.99"
          additionalInfo="Available in multiple sizes and colors. Features advanced cushioning technology for maximum comfort."
        />
      </div>
    </motion.div>
  );
}
