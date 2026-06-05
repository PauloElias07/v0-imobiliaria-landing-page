"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const faqs = [
  {
    question: "Como funciona o processo de compra de um apartamento?",
    answer: "O processo começa com a definição do seu perfil e necessidades. Depois, apresento opções que se encaixam no seu orçamento e preferências. Após encontrar o imóvel ideal, auxiliamos em toda negociação, análise documental e fechamento do contrato.",
  },
  {
    question: "Quanto preciso ter de entrada para financiar um apartamento?",
    answer: "Geralmente, os bancos financiam até 80% do valor do imóvel, exigindo uma entrada mínima de 20%. Porém, existem programas específicos como o Minha Casa Minha Vida que podem exigir entradas menores. Analiso seu caso individualmente para encontrar a melhor opção.",
  },
  {
    question: "Qual é o prazo médio para conseguir um financiamento?",
    answer: "O prazo varia conforme o banco e a documentação do cliente. Em média, a aprovação do crédito leva de 15 a 30 dias. Com toda documentação em ordem, o processo completo pode levar de 45 a 60 dias até a assinatura do contrato.",
  },
  {
    question: "Você trabalha apenas com apartamentos novos ou usados também?",
    answer: "Trabalho com ambos! Tenho apartamentos novos (lançamentos) e usados em excelente estado. Cada tipo tem suas vantagens: novos oferecem personalização e garantias, enquanto usados podem ter melhor localização e preço.",
  },
  {
    question: "Quais documentos são necessários para comprar um imóvel?",
    answer: "Os principais documentos são: RG, CPF, comprovante de renda, declaração de IR, certidão de casamento (se aplicável), comprovante de endereço e extrato bancário. Para financiamento, podem ser solicitados documentos adicionais pelo banco.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-accent font-medium mb-4 tracking-wider uppercase text-sm">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
              Perguntas frequentes sobre compra de imóveis
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Tire suas dúvidas sobre o processo de compra de apartamentos em São Paulo. 
              Se não encontrar sua resposta aqui, entre em contato diretamente comigo.
            </p>
            <a
              href="https://wa.me/5511988649386?text=Olá! Tenho uma dúvida sobre compra de imóveis."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
            >
              Ainda tem dúvidas? Fale comigo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
