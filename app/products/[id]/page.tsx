"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import MainPageNavBar from "../../components/MainPageNavBar";
import Footer from "../../components/Footer";
import { productsMock } from "@/data/productsMock";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const product = productsMock.find((p) => p.id === productId);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="bg-[#F5F5DC] min-h-screen">
      <MainPageNavBar />
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={400}
                className="h-full w-full object-cover md:w-96"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 text-xl mb-4">{product.price}</p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-gray-600 mb-4">
                Categoria: {product.category}
              </p>
              <button className="bg-gray-800 text-white py-2 px-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
