"use client";
import { MotionValue, motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Banner({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer logic
  useEffect(() => {
    const bannerElement = bannerRef.current;
    if (!bannerElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            // Scroll to the top of the banner element
            bannerElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 60% of the element is visible
      }
    );

    observer.observe(bannerElement);

    return () => {
      observer.unobserve(bannerElement);
    };
  }, []);

  return (
    <motion.div
      ref={bannerRef}
      style={{ scale, rotate }}
      className="relative  w-full shadow-md  h-screen flex items-center justify-center"
    >
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
