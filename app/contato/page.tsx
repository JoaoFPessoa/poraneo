import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-10">
      <Navbar />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-10 mt-36">
          <div>
            <h1 className="text-5xl font-semibold">contate-nos</h1>
            <p className="mt-4 text-sm max-w-xs">
              entre em contato conosco para qualquer dúvida ou solicitação
            </p>
          </div>

          <div className="space-y-1 text-sm">
            <p className="text-gray-500">dúvidas gerais</p>
            <p className="font-semibold">contato@poraneo.com</p>
            <a
              href="https://wa.me/5511999229517"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              +55 11 99922-9517
            </a>
          </div>

          <div className="space-y-1 text-sm">
            <p className="text-gray-500">endereço</p>
            <p className="font-semibold">
              R. Lagoa Nova, 174 - Jardim California, Barueri - SP
            </p>
            <p className="font-semibold">06409-090</p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="hidden lg:flex mt-16 flex items-center  h-full  justify-center">
          <Image
            width={500}
            height={500}
            src="/contact/high.jpg"
            alt="Entrada da loja High em Paris"
            className=" rounded-lg shadow-md object-cover w-full max-h-[500px]"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
