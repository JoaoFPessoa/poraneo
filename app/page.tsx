"use client";
import { useEffect, useRef } from "react";
import Banner from "./components/Banner";
import Hero from "./components/Hero";
import Lenis from "lenis";
import Footer from "./components/Footer";
import CTA from "./components/CTA";

export default function Home() {
  const container = useRef(null);

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
          <Hero />
          <Banner />
        </div>
      </main>

      {/* container without scroll tracking */}
      <div className="bg-black">
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
