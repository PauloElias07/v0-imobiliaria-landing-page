"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Landmark, ExternalLink, FileCheck2, Percent, CalendarClock } from "lucide-react"

interface BankItem {
  name: string
  description: string
  url: string
}

const banks: BankItem[] = [
  {
    name: "Caixa Econômica Federal",
    description: "Maior financiadora habitacional do país, com linhas via FGTS e SBPE. Simule prazos, entrada e parcelas direto no site oficial.",
    url: "https://simuladorhabitacao.caixa.gov.br/home",
  },
  {
    name: "Itaú",
    description: "Crédito imobiliário com simulação online rápida para financiamento ou portabilidade do seu imóvel.",
    url: "https://www.itau.com.br/emprestimos-financiamentos/credito-imobiliario",
  },
  {
    name: "Bradesco",
    description: "Simuladores de crédito imobiliário para quem busca financiar a compra ou construção do seu imóvel.",
    url: "https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm",
  },
  {
    name: "Santander",
    description: "Plataforma de negócios imobiliários do Santander, com simulação de financiamento e condições especiais.",
    url: "https://www.negociosimobiliarios.santander.com.br/negociosimobiliarios/#/home",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function FinancingSection() {
  return (
    <section id="financiamento" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold-outline font-medium mb-4 tracking-wider uppercase text-sm">
            Financiamento Imobiliário
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Simule as condições no seu banco de preferência
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Realize a simulação diretamente nos canais oficiais dos principais bancos parceiros e encontre as
            melhores condições de entrada, prazo e taxas para o seu imóvel.
          </p>
        </motion.div>

        {/* INFO STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-14 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-accent" />
            <span>Taxas e condições variam por banco</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-accent" />
            <span>Prazos de até 35 anos</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-accent" />
            <span>Sujeito à análise de crédito</span>
          </div>
        </motion.div>

        {/* GRID DE BANCOS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {banks.map((bank) => (
            <motion.div
              key={bank.name}
              variants={itemVariants}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent/25 transition-colors">
                <Landmark className="w-6 h-6 text-accent" />
              </div>

              <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                {bank.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {bank.description}
              </p>

              <Link
                href={bank.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary text-primary px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer"
              >
                Simular Financiamento
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* DISCLAIMER */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs text-muted-foreground text-center max-w-2xl mx-auto mt-10"
        >
          Os simuladores acima pertencem às respectivas instituições financeiras e abrem em uma nova aba. Valores,
          taxas e prazos são de responsabilidade de cada banco e estão sujeitos à análise de crédito.
        </motion.p>
      </div>
    </section>
  )
}