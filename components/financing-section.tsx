"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function FinancingSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-gold-outline font-medium mb-4 tracking-wider uppercase text-sm">
              Financiamento
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
              Realizando seu sonho com financiamento facilitado
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Não deixe que a burocracia atrapalhe seu sonho. Ofereço suporte completo 
              para aprovação de financiamento junto aos principais bancos do mercado, 
              com as melhores taxas e condições.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Análise gratuita do seu perfil de crédito",
                "Simulação com múltiplos bancos",
                "Auxílio na documentação necessária",
                "Acompanhamento até a aprovação",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="https://wa.me/5511988649386?text=Olá! Gostaria de saber mais sobre financiamento imobiliário."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
            >
              Simular meu financiamento
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-card p-8 rounded-2xl shadow-sm">
              <span className="block text-4xl font-bold text-gold-outline mb-2">420</span>
              <span className="text-muted-foreground">Meses de prazo máximo</span>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm">
              <span className="block text-4xl font-bold text-gold-outline mb-2">80%</span>
              <span className="text-muted-foreground">Do valor financiado</span>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm">
              <span className="block text-4xl font-bold text-gold-outline mb-2">8%</span>
              <span className="text-muted-foreground">Taxa de juros a partir de</span>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm">
              <span className="block text-4xl font-bold text-gold-outline mb-2">30</span>
              <span className="text-muted-foreground">Dias para aprovação</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
