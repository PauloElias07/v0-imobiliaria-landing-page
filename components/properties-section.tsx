"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const properties = [
  {
    id: 1,
    name: "Residencial Villa Moderna",
    neighborhood: "Vila Mariana",
    bedrooms: 3,
    area: 120,
    price: "R$ 850.000 - R$ 1.200.000",
    image: "/images/apartment-1.png",
  },
  {
    id: 2,
    name: "Edifício Parque das Flores",
    neighborhood: "Saúde",
    bedrooms: 2,
    area: 75,
    price: "R$ 550.000 - R$ 750.000",
    image: "/images/apartment-2.png",
  },
  {
    id: 3,
    name: "Condomínio Alto Padrão",
    neighborhood: "Praça da Árvore",
    bedrooms: 4,
    area: 180,
    price: "R$ 1.500.000 - R$ 2.200.000",
    image: "/images/apartment-3.png",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function PropertiesSection() {
  return (
    <section id="imoveis" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent font-medium mb-4 tracking-wider uppercase text-sm">
            Imóveis em Destaque
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-balance">
            Oportunidades exclusivas para você
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Confira alguns dos apartamentos disponíveis nas melhores localizações de São Paulo.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {properties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              className="group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {property.neighborhood}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                  {property.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <BedroomIcon />
                    <span>{property.bedrooms} quartos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AreaIcon />
                    <span>{property.area}m²</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold">{property.price}</span>
                </div>
                <Link
                  href={`https://wa.me/5511988649386?text=Olá! Tenho interesse no imóvel ${property.name} em ${property.neighborhood}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
                >
                  Tenho Interesse
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="https://wa.me/5511988649386?text=Olá! Gostaria de ver mais opções de imóveis."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
          >
            Ver todos os imóveis disponíveis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function BedroomIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9-4 9 4" />
    </svg>
  )
}

function AreaIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  )
}
