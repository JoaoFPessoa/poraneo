import { HoverLiftCard } from "@/components/ui/ProductsCards/HoverLiftCard";
import { ImageZoomCard } from "@/components/ui/ProductsCards/ImageZoomCard";
import { RevealInfoCard } from "@/components/ui/ProductsCards/RevealInfoCard";
import { TiltCard } from "@/components/ui/ProductsCards/TiltCard";
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
      className="relative max-w-7xl !text-white  mx-auto flex flex-col items-center"
    >
      <h1
        className="text-5xl p-6 w-fit font-semibold mb-8 text-center tracking-wide"
        style={{ boxShadow: "0px 4px 3px -1px rgba(0, 0, 0, 0.1)" }}
      >
        {" "}
        lançamentos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <HoverLiftCard
            imageSrc={"/cadeira.webp"}
            title="Wireless Headphones"
            description="High-quality sound with noise cancellation"
            price="$199.99"
          />
        </div>
        <div>
          <ImageZoomCard
            imageSrc="/cadeira.webp"
            title="Smart Watch"
            description="Track your fitness and stay connected"
            price="$249.99"
          />
        </div>
        <div>
          <RevealInfoCard
            imageSrc="/cadeira.webp"
            title="Running Shoes"
            description="Comfortable and lightweight for your daily run"
            price="$129.99"
            additionalInfo="Available in multiple sizes and colors. Features advanced cushioning technology for maximum comfort."
          />
        </div>
        <div>
          <TiltCard
            imageSrc="/cadeira.webp"
            title="Classic Sneakers"
            description="Timeless style for everyday wear"
            price="$89.99"
          />
        </div>
      </div>
    </motion.div>
  );
}
