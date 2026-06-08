"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/Perfil.png"
                alt="Roberto Elias - Corretor de Imóveis"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/15 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-accent/40 rounded-2xl -z-10" />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-gold-outline font-medium mb-4 tracking-wider uppercase text-sm">
              Sobre o Corretor
            </span>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Roberto Elias
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Roberto Elias atua no mercado imobiliário com foco em atendimento personalizado,
              auxiliando clientes na busca pelo apartamento ideal.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Em parceria com a Construtora Tarjab, oferece acesso a empreendimentos exclusivos
              e oportunidades diferenciadas nas melhores regiões de São Paulo.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Também é Advogado especializado em Direito do Consumidor, trazendo mais segurança
              e transparência para cada negociação.
            </p>

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

              {/* TARJAB CARD */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70 p-6 text-white shadow-lg border border-white/10">
                
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

                <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent mb-3 font-semibold">
                  Parceria Oficial
                </span>

                <h3 className="text-3xl font-bold mb-3 text-white">
                  TARJAB
                </h3>

                <p className="text-white/75 leading-relaxed">
                  Empreendimentos exclusivos, lançamentos premium e oportunidades estratégicas
                  em São Paulo.
                </p>
              </div>

              {/* INSTAGRAM CARD */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/15 via-white to-primary/5 p-6 border border-accent/20 shadow-md text-foreground">

                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

                <div className="flex items-center gap-3 mb-4">
                  <svg
                    className="w-7 h-7 text-accent"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.8h8.5a3.95 3.95 0 013.95 3.95v8.5a3.95 3.95 0 01-3.95 3.95h-8.5a3.95 3.95 0 01-3.95-3.95v-8.5A3.95 3.95 0 017.75 3.8zm8.95 1.35a1.05 1.05 0 100 2.1 1.05 1.05 0 000-2.1zM12 6.85A5.15 5.15 0 106 12a5.15 5.15 0 006-5.15zm0 1.8A3.35 3.35 0 118.65 12 3.35 3.35 0 0112 8.65z" />
                  </svg>

                  <span className="text-xl font-bold text-foreground">
                    Instagram
                  </span>
                </div>

                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Vídeos dos empreendimentos, tours exclusivos e novidades do mercado imobiliário.
                </p>

                <Link
                  href="https://www.instagram.com/robertoelias_corretortarjab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold hover:bg-primary/90 hover:scale-105 transition-all duration-200"
                >
                  Ver conteúdos
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
              </div>
            </div>

            {/* CTA */}
            <Link
              href="https://wa.me/5511988649386?text=Olá, Gostaria de mais informações sobre os empreendimentos!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold hover:bg-accent/90 transition-all duration-200 hover:scale-105 shadow-md"
            >
              Agende uma conversa
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
      </div>
    </section>
  )
}