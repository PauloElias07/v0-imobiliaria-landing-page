"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/Perfil.png"
                alt="Roberto Elias - Corretor de Imóveis"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-accent rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-gold-outline font-medium mb-4 tracking-wider uppercase text-sm">
              Sobre o Corretor
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
              Roberto Elias
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Roberto Elias atua no mercado imobiliário com foco em atendimento personalizado,
              auxiliando clientes na busca pelo apartamento ideal de acordo com seu perfil,
              necessidades e objetivos. Em parceria com a construtora Tarjab, oferece acesso a
              excelentes oportunidades e empreendimentos diferenciados em São Paulo.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Além da atuação como corretor, também é advogado especializado em Direito do
              Consumidor, proporcionando mais segurança, transparência e confiança durante todas as
              etapas da negociação e documentação do imóvel.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Com acompanhamento próximo e suporte completo do início ao fim, garante uma
              experiência de compra mais tranquila, segura e eficiente.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-secondary rounded-xl">
                <span className="block text-3xl font-bold text-gold-outline mb-1">500+</span>
                <span className="text-sm text-muted-foreground">Imóveis Vendidos</span>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <span className="block text-3xl font-bold text-gold-outline mb-1">15+</span>
                <span className="text-sm text-muted-foreground">Anos de Experiência</span>
              </div>
            </div>

            <Link
              href="https://wa.me/5511988649386"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
            >
              Agende uma conversa
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
