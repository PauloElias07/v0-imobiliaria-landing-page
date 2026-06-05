"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const testimonials = [
  {
    name: "Maria Clara Santos",
    location: "Vila Mariana",
    text: "O Roberto foi excepcional em todo o processo. Encontrou o apartamento perfeito para nossa família e nos guiou em cada etapa da compra. Recomendo de olhos fechados!",
    rating: 5,
  },
  {
    name: "João Pedro Oliveira",
    location: "Saúde",
    text: "Profissionalismo e dedicação únicos. Ele entendeu exatamente o que eu procurava e apresentou opções incríveis. Fechei negócio em menos de um mês!",
    rating: 5,
  },
  {
    name: "Ana Beatriz Costa",
    location: "Praça da Árvore",
    text: "Atendimento impecável do início ao fim. O Roberto conhece a região como ninguém e me ajudou a encontrar um apartamento com tudo que eu precisava.",
    rating: 5,
  },
  {
    name: "Ricardo Mendes",
    location: "Jabaquara",
    text: "Excelente corretor! Muito atencioso e sempre disponível para tirar dúvidas. O processo foi muito tranquilo graças à sua experiência.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="depoimentos" className="py-24 bg-background">
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
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-balance">
            O que dizem nossos clientes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A satisfação dos meus clientes é minha maior conquista. Veja o que eles 
            têm a dizer sobre a experiência de trabalhar comigo.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-2xl p-8 md:p-12 shadow-lg relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-4 left-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6 pt-4">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>

            {/* Text */}
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
              {`"${testimonials[activeIndex].text}"`}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-accent font-bold text-lg">
                  {testimonials[activeIndex].name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-foreground">{testimonials[activeIndex].name}</h4>
                <p className="text-muted-foreground text-sm">{testimonials[activeIndex].location}</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-accent w-8" : "bg-muted hover:bg-accent/50"
                }`}
                aria-label={`Ver depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
