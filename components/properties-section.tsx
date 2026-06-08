"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const properties = [
  {
    id: 1,
    name: "Altus - Tarjab",
    neighborhood: "Ipiranga",
    address: "Rua Visconde de Guaratiba, nº 105",
    bedrooms: "2 a 3",
    area: "72 a 93 m²",
    price: "R$ 852.000 - R$ 1.380.000",
    image: "/images/altus.png",
    video: "https://youtube.com/shorts/XpTWGPeNIX4?si=zC4EWI6_3OTYk7pQ",
  },

  {
    id: 2,
    name: "Riserva - Tarjab",
    neighborhood: "Vila Clementino",
    address: "Av. Dr. Altino Arantes, nº 222",
    bedrooms: "1 a 4",
    area: "32 a 172 m²",
    price: "R$ 540.000 - R$ 3.400.000",
    image: "/images/riserva.png",
    video: "https://youtube.com/shorts/EaycLCVoD4M?si=b42G0_m84M0sAq2q",
  },

  {
    id: 3,
    name: "Vila Ares - Tarjab",
    neighborhood: "Saúde",
    address: "Rua dos Alcatrazes, nº 37",
    bedrooms: "1 a 3",
    area: "46 a 91 m²",
    price: "R$ 740.000 - R$ 1.380.000",
    image: "/images/vila-ares.png",
    video: "https://youtube.com/shorts/14syZFP7nxQ?si=E05x2IRPQAlp_MHh",
  },

  {
    id: 4,
    name: "Viccino - Tarjab",
    neighborhood: "Mirandópolis",
    address: "Av. Senador Casemiro da Rocha, nº 683",
    bedrooms: "1 a 3",
    area: "35 a 128 m²",
    price: "R$ 520.000 - R$ 2.240.000",
    image: "/images/viccino.png",
    video: "https://youtube.com/shorts/PH1IqA3H2t8?si=q_IChnmVwWj7Hlyp",
  },

  {
    id: 5,
    name: "Criare - Tarjab",
    neighborhood: "Saúde",
    address: "Rua Guarujá, nº 94",
    bedrooms: "1 a 2",
    area: "33 a 74 m²",
    price: "R$ 500.000 - R$ 1.310.000",
    image: "/images/criare.png",
    video: "https://youtube.com/shorts/zROUdpJXD0o?si=QeMVJkW6rblJsZcH",
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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <section id="imoveis" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold-outline font-medium mb-4 tracking-wider uppercase text-sm">
            Imóveis em Destaque
          </span>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Oportunidades exclusivas para você
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Confira alguns dos apartamentos disponíveis nas melhores
            localizações de São Paulo.
          </p>
        </motion.div>

        {/* GRID */}
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
              {/* IMAGE */}
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

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                  {property.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {property.address}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                  <div className="flex items-center gap-1">
                    <BedroomIcon />
                    <span>{property.bedrooms} quartos</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <AreaIcon />
                    <span>{property.area}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <span className="text-gold-outline font-bold text-lg">
                    {property.price}
                  </span>
                </div>

                {/* VIDEO BUTTON */}
                <button
                  onClick={() => setSelectedVideo(property.video)}
                  className="mb-3 w-full inline-flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  Ver vídeo do imóvel

                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>

                {/* WHATSAPP BUTTON */}
                <Link
                  href={`https://wa.me/5511988649386?text=Olá! Tenho interesse no imóvel ${property.name} em ${property.neighborhood}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
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
            className="inline-flex items-center gap-2 text-gold-outline font-semibold hover:underline"
          >
            Encontrar o imóvel ideal

            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white text-black text-xl font-bold hover:scale-105 transition-transform"
            >
              ×
            </button>

            {/* VIDEO */}
            <iframe
              src={selectedVideo}
              title="Vídeo do imóvel"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}

function BedroomIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7l9-4 9 4"
      />
    </svg>
  )
}

function AreaIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
      />
    </svg>
  )
}