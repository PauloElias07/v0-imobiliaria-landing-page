"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const regions = [
  "Saúde",
  "Praça da Árvore",
  "Vila Mariana",
  "Moema",
  "Mirandópolis",
  "Vila Clementino",
  "Outra região",
]

const priceRanges = [
  "Até R$ 500.000",
  "R$ 500.000 - R$ 800.000",
  "R$ 800.000 - R$ 1.200.000",
  "R$ 1.200.000 - R$ 2.000.000",
  "Acima de R$ 2.000.000",
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    region: "",
    priceRange: "",
  })
  
  // Estado para armazenar a região personalizada digitada pelo usuário
  const [customRegion, setCustomRegion] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Define se vai usar a região do select ou o texto digitado na caixa manual
    const finalRegion = formData.region === "Outra região" ? customRegion : formData.region

    // Criar mensagem do WhatsApp
    const message = `Olá! Me chamo ${formData.name}.
Tenho interesse em apartamentos na região: ${finalRegion}
Faixa de valor: ${formData.priceRange}
Meu telefone: ${formData.phone}`
    
    const whatsappUrl = `https://wa.me/5511988649386?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    
    setIsSubmitted(true)
  }

  return (
    <section id="contato" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-gold-outline font-medium mb-4 tracking-wider uppercase text-sm">
              Entre em Contato
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-balance">
              Receba as melhores oportunidades
            </h2>
            <p className="text-muted-foreground text-lg">
              Preencha o formulário abaixo e receba ofertas exclusivas de imóveis 
              na região de seu interesse.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background rounded-2xl p-8 md:p-12 shadow-lg"
          >
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                  Obrigado pelo interesse!
                </h3>
                <p className="text-muted-foreground">
                  Você será redirecionado para o WhatsApp. Entrarei em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-foreground mb-2">
                      Região de interesse
                    </label>
                    <select
                      id="region"
                      required
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    >
                      <option value="">Selecione a região</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="priceRange" className="block text-sm font-medium text-foreground mb-2">
                      Faixa de valor
                    </label>
                    <select
                      id="priceRange"
                      required
                      value={formData.priceRange}
                      onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    >
                      <option value="">Selecione a faixa</option>
                      {priceRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Caixa de texto condicional com animação suave do Framer Motion */}
                {formData.region === "Outra região" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="customRegion" className="block text-sm font-medium text-foreground mb-2">
                      Digite a região desejada
                    </label>
                    <input
                      type="text"
                      id="customRegion"
                      required
                      value={customRegion}
                      onChange={(e) => setCustomRegion(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="Ex: Ipiranga, Itaim Bibi..."
                    />
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 hover:scale-[1.02]"
                >
                  Quero receber oportunidades
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}