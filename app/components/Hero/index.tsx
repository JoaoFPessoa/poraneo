import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero({}) {
  return (
    <motion.div className="sticky top-0 flex flex-col items-center justify-center bg-[var(--primary)] h-screen pb-[10vh] relative">
      <motion.section
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3 }}
      >
        <Image
          src={"/hero-cover.png"}
          alt="banner cover"
          width={400}
          height={400}
        />
      </motion.section>

      {/* 🔽 Seta animada indicando mais conteúdo abaixo */}
      <motion.div
        className="absolute bottom-10 flex justify-center"
        animate={{ y: [0, 10, 0] }} // Animação de subida e descida
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-12 h-12 text-black opacity-70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
