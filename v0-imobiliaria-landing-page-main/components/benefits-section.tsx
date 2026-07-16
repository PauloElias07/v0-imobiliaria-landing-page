"use client"

import { motion } from "framer-motion"
import React from "react"

const benefits = [
  {
    icon: "personalized",
    title: "Atendimento Personalizado",
    description:
      "Entendo suas necessidades e busco o imóvel ideal para você e sua família.",
  },

  {
    icon: "opportunities",
    title: "Melhores Oportunidades",
    description:
      "Acesso a imóveis exclusivos e lançamentos antes do mercado.",
  },

  {
    icon: "documents",
    title: "Suporte Documental",
    description:
      "Acompanhamento completo em toda documentação e análise jurídica.",
  },

  {
    icon: "whatsapp",
    title: "Atendimento via WhatsApp",
    description:
      "Respostas rápidas e acompanhamento em tempo real pelo WhatsApp.",
  },

  {
    icon: "location",
    title: "Especialista na Zona Sul",
    description:
      "Conhecimento estratégico das melhores regiões e empreendimentos de São Paulo.",
  },

  {
    icon: "security",
    title: "Negociação com Segurança",
    description:
      "Mais transparência e confiança durante todas as etapas da compra do imóvel.",
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

export function BenefitsSection() {
  return (
    <section
      id="beneficios"
      className="py-24 bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold-outline-light font-medium mb-4 tracking-wider uppercase text-sm">
            Por que me escolher
          </span>

          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-balance">
            Benefícios de trabalhar comigo
          </h2>

          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Mais do que vender imóveis, meu objetivo é realizar o sonho do
            imóvel ideal com segurança, transparência e tranquilidade.
          </p>
        </motion.div>

        {/* BENEFITS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="group p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              {/* ICON */}
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                <BenefitIcon type={benefit.icon} />
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-serif font-bold mb-3">
                {benefit.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-primary-foreground/70 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function BenefitIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    personalized: (
      <svg
        className="w-6 h-6 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),

    opportunities: (
      <svg
        className="w-6 h-6 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),

    documents: (
      <svg
        className="w-6 h-6 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),

    whatsapp: (
      <svg
        className="w-6 h-6 text-accent"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48A11.8 11.8 0 0012.04 0C5.4 0 0 5.4 0 12.04c0 2.12.55 4.18 1.6 6L0 24l6.12-1.56a12 12 0 005.92 1.52h.01C18.64 23.96 24 18.6 24 12.04c0-3.2-1.24-6.2-3.48-8.56zM12.05 21.9h-.01a9.9 9.9 0 01-5.05-1.39l-.36-.21-3.63.95.97-3.54-.23-.37a9.88 9.88 0 01-1.52-5.28c0-5.48 4.46-9.94 9.95-9.94 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 012.9 7.03c0 5.48-4.46 9.94-9.93 9.94zm5.45-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.38-.27.3-1.04 1.02-1.04 2.49 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.21 5.08 4.5.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
      </svg>
    ),

    location: (
      <svg
        className="w-6 h-6 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),

    security: (
      <svg
        className="w-6 h-6 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3l7 4v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z"
        />
      </svg>
    ),
  }

  return icons[type] || null
}