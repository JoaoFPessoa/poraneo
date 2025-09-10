"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function SobrePage() {
  return (
    <div className="min-h-screen  text-gray-800">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-sm text-gray-500">
          <a href="/">início</a>
          <span className="mx-2">/</span>
          <a href="/about" className="text-amber-500">
            sobre
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="mt-4">
          <h1 className="text-4xl font-light mb-12">sobre nós</h1>

          <div className="flex flex-col md:flex-row md:gap-12">
            {/* Left Column - Content */}
            <div className=" md:w-1/3">
              <p className="text-lg leading-relaxed mb-6">
                estúdio de arquitetura com foco em soluções através do desenho
                aplicado em diferentes escalas: arquitetura, mobiliário e
                expografia.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                materializar ideias através da pesquisa e criar harmonia entre
                espacialidade, contexto e estética.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className=" md:w-1/2 h-[400px] lg:h-[600px] relative">
              <Image
                alt="Sócios: Guilherme e Nubia"
                src="/about/about-cover.jpg"
                fill
                className="lg:object-cover object-center object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
