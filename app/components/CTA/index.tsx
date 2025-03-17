import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background com efeito parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/banner-cover.jpg')",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Overlay com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* Conteúdo do CTA */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-amber-400 uppercase tracking-widest text-sm font-light mb-4">
            Artesanato de excelência
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide mb-6">
            Transforme sua casa em um{" "}
            <span className="italic">refúgio de elegância</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-12 font-light text-lg">
            Cada peça que criamos é fruto da dedicação de artesãos
            especializados, utilizando as mais nobres madeiras e técnicas
            refinadas ao longo de gerações.
          </p>

          {/* Separador ornamental */}
          <div className="flex items-center justify-center mb-12">
            <span className="h-px w-16 bg-amber-500/30"></span>
            <span className="mx-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6L7 11L12 16M12 6L17 11L12 16"
                  stroke="#D4A257"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="h-px w-16 bg-amber-500/30"></span>
          </div>

          {/* Botões de CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="/agendamento"
              className="relative overflow-hidden group px-10 py-4 bg-amber-800/20 backdrop-blur-sm border border-amber-500/40 text-amber-100 text-sm uppercase tracking-widest transition-all duration-500 hover:bg-amber-800/40"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="relative z-10 group-hover:text-amber-50 transition-colors duration-300">
                Contate-nos
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-r from-amber-700/40 to-amber-500/40 transition-all duration-500 group-hover:h-full"></span>
            </motion.a>

            <motion.a
              href="/products"
              className="relative group px-10 py-4 bg-transparent border border-white/20 text-white/90 text-sm uppercase tracking-widest transition-all duration-500 hover:border-amber-400/30"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="group-hover:text-amber-200 transition-colors duration-300">
                Explorar Catálogo
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Elemento decorativo */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
    </section>
  );
};

export default CTA;
