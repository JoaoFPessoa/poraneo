import { useTransform, motion, MotionValue } from "framer-motion";
import Image from "next/image";
import NavBar from "../Navbar";

export default function Hero({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 flex items-center justify-center bg-[var(--primary)] h-screen "
    >
      <NavBar />
      <motion.section
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <Image
          src={"/hero-cover.png"}
          alt="banner cover"
          width={400}
          height={400}
        />
      </motion.section>
    </motion.div>
  );
}
