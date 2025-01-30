"use client";
import { MotionValue, motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Banner({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);
  const [tiltStyle, setTiltStyle] = useState({});
  const tiltRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  // tilt animation logic
  useEffect(() => {
    const tiltElement = tiltRef.current;
    if (!tiltElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = tiltElement.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      const tiltX = (y - 0.5) * 60; // Tilt up to 20 degrees
      const tiltY = (x - 0.5) * -60; // Tilt up to 20 degrees

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.1, 1.1, 1.1)`,
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
      className="relative mb-32 w-full shadow-md h-screen flex items-center justify-center"
    >
      <Image
        src="/banner-cover.png"
        alt="Banner art"
        fill
        className="max-w-full max-h-full"
      />
      <Image
        height={400}
        className="absolute left-[56px] top-[56px]"
        width={400}
        src="/logo/yellow-no-bg.png"
        alt="Chair"
      />
      {/* Wrapper div for the chair and its shadow */}
      <div className="absolute bottom-[48px]" ref={tiltRef} style={tiltStyle}>
        <div className="relative">
          <Image
            height={480}
            className="drop-shadow-2xl"
            width={480}
            src="/banner-chair.png"
            alt="Chair"
          />
          {/* Shadow effect */}
          <div className="absolute bottom-10 left-0 right-24 h-8 bg-black/30 blur-lg"></div>
        </div>
      </div>
    </motion.div>
  );
}
