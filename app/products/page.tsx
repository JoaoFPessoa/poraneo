"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import Image from "next/image";
import Navbar from "../components/Navbar";

const categories = [
  "Todas",
  "Clássica",
  "Moderna",
  "Escritório",
  "Jantar",
  "Poltrona",
  "Bar",
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  return (
    <div className="bg-[var(--primary)] min-h-screen w-full">
      <Navbar />
      <main className=" flex flex-col justify-center items-center w-[90%] mx-auto px-6 py-8">
        <Image
          src={"/logo/black-no-bg.png"}
          alt="logo poraneo"
          width={200}
          height={200}
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ProductGrid category={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
}
