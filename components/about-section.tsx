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

            {/* DECORATIVE ELEMENTS */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-2xl -z-10" />

            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-accent rounded-2xl -z-10" />
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
              Roberto Elias atua no mercado imobiliário com foco em atendimento
              personalizado, auxiliando clientes na busca pelo apartamento ideal
              de acordo com seu perfil, necessidades e objetivos.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Em parceria com a construtora Tarjab, oferece acesso a
              empreendimentos exclusivos e oportunidades diferenciadas nas
              melhores regiões de São Paulo.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Além da atuação como corretor, também é advogado especializado em
              Direito do Consumidor, proporcionando mais segurança,
              transparência e confiança durante todas as etapas da negociação.
            </p>

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {/* TARJAB CARD */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 text-white shadow-lg border border-white/10">
                <div className="absolute top-0 right-0 w-28 h-28 bg-accent/10 rounded-full blur-2xl" />

                <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent mb-3 font-semibold">
                  Parceria Oficial
                </span>

                <h3 className="text-3xl font-bold mb-3">
                  TARJAB
                </h3>

                <p className="text-white/70 leading-relaxed">
                  Acesso a lançamentos exclusivos, empreendimentos premium e
                  oportunidades diferenciadas nas melhores regiões de São Paulo.
                </p>
              </div>

              {/* INSTAGRAM CARD */}
              <div className="rounded-2xl bg-gradient-to-br from-orange-100 via-orange-50 to-emerald-50 border border-orange-200/60 p-6 text-zinc-800 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.8h8.5a3.95 3.95 0 013.95 3.95v8.5a3.95 3.95 0 01-3.95 3.95h-8.5a3.95 3.95 0 01-3.95-3.95v-8.5A3.95 3.95 0 017.75 3.8zm8.95 1.35a1.05 1.05 0 100 2.1 1.05 1.05 0 000-2.1zM12 6.85A5.15 5.15 0 106 12a5.15 5.15 0 006-5.15zm0 1.8A3.35 3.35 0 118.65 12 3.35 3.35 0 0112 8.65z" />
                  </svg>

                  <span className="text-2xl font-bold text-zinc-900">
                    Instagram
                  </span>
                </div>

                <p className="text-zinc-700 mb-5 leading-relaxed">
                  Conheça vídeos dos empreendimentos, tours exclusivos e
                  novidades do mercado imobiliário.
                </p>

                <Link
                  href="https://www.instagram.com/robertoelias_corretortarjab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-zinc-800 hover:scale-105 transition-all duration-200"
                >
                  Acessar Instagram

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
                      d="M14 5h5m0 0v5m0-5L10 14"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 9v10h10"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="https://wa.me/5511988649386"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg"
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