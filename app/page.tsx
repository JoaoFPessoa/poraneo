"use client";
import { useEffect, useRef } from "react";
import Banner from "./components/Banner";
import Hero from "./components/Hero";
import MainProducts from "./components/MainProducts";
import { useScroll } from "framer-motion";
import Lenis from "lenis";
import Footer from "./components/Footer";
import CTA from "./components/CTA";

export default function Home() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // smooth scroll
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="overflow-x-hidden bg-black">
      {/* container that tracks scroll */}
      <main ref={container} className="relative">
        <div>
          <Hero scrollYProgress={scrollYProgress} />
          <Banner scrollYProgress={scrollYProgress} />
        </div>
      </main>

      {/* container without scroll tracking */}
      <div className="bg-black">
        <MainProducts />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
