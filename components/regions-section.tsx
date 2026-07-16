"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const neighborhoods = [
  {
    name: "Saúde",
    image: "/images/neighborhood-saude.png",
    description: "Bairro tradicional com excelente infraestrutura e fácil acesso ao metrô.",
    highlights: ["Metrô Saúde", "Hospitais renomados", "Comércio variado"],
  },
  {
    name: "Praça da Árvore",
    image: "/images/neighborhood-praca-arvore.png",
    description: "Região residencial tranquila com ótimas opções de lazer e gastronomia.",
    highlights: ["Metrô Praça da Árvore", "Áreas verdes", "Restaurantes"],
  },
  {
    name: "Vila Mariana",
    image: "/images/neighborhood-vila-mariana.png",
    description: "Um dos bairros mais desejados de São Paulo, com alto padrão de vida.",
    highlights: ["MASP próximo", "Parque Ibirapuera", "Vida cultural"],
  },
  {
    name: "Moema",
    image: "/images/neighborhood-moema.png",
    description: "Excelente custo-benefício com infraestrutura completa de transporte.",
    highlights: ["Parque Ibirapuera", "Metrô Moema", "Em valorização"],
  },
  {
    name: "Mirandópolis",
    image: "/images/neighborhood-mirandopolis.png",
    description: "Bairro residencial de classe média alta com ruas arborizadas.",
    highlights: ["Tranquilidade", "Segurança", "Qualidade de vida"],
  },
  {
  name: "Vila Clementino",
  image: "/images/neighborhood-vila_clementino.png",
  description: "Bairro valorizado da Zona Sul com excelente infraestrutura, mobilidade e qualidade de vida.",
  highlights: ["Localização estratégica", "Infraestrutura completa", "Mobilidade urbana"],
},
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function RegionsSection() {
  return (
    <section id="regioes" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold-outline font-medium mb-4 tracking-wider uppercase text-sm">
            Regiões Atendidas
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-balance">
            Conheça os melhores bairros da zona sul
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Atuo nas regiões mais valorizadas de São Paulo, oferecendo imóveis com 
            excelente localização e infraestrutura.
          </p>
        </motion.div>

        {/* Neighborhoods Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {neighborhoods.map((neighborhood) => (
            <motion.div
              key={neighborhood.name}
              variants={itemVariants}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={neighborhood.image}
                  alt={neighborhood.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    {neighborhood.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    {neighborhood.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
