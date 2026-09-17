"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// Configuração dos Banners
const BANNERS = [
  {
    id: 1,
    badge: "Vivaz Residencial • Minha Casa Minha Vida",
    title: "Apartamentos Acessíveis nas Melhores Regiões de SP",
    subtitle: "Realize o sonho da casa própria em localizações centralizadas e privilegiadas.",
    description: "Opções sob medida pelo programa Minha Casa Minha Vida com subsídios, facilidade de entrada e o suporte especializado de Roberto Elias.",
    image: "/images/hero-apartment.png",
    primaryBtnText: "Falar no WhatsApp",
    primaryBtnLink: "https://wa.me/5511988649386?text=Olá%20Roberto,%20gostaria%20de%20saber%20mais%20sobre%20os%20apartamentos%20Vivaz", 
    secondaryBtnText: "Ver imóveis disponíveis",
    secondaryBtnLink: "#imoveis",
    showWhatsAppIcon: true,
    showArrowIcon: true,
    hasOverlay: true,
    overlayClass: "from-primary/95 via-primary/80 to-primary/60" 
  },
  {
    id: 2,
    badge: "Oportunidade Imperdível", 
    title: <>Conquiste seu imóvel com as facilidades do <span className="inline-block text-accent font-mono font-black text-3xl md:text-5xl my-3 tracking-tight border-2 border-accent bg-accent/10 px-4 py-2 rounded-2xl shadow-lg shadow-accent/20">Minha Casa Minha Vida</span></>, 
    subtitle: "Apartamentos bem localizados que cabem no seu bolso.", 
    description: "Entrada facilitada, subsídios do governo e condições especiais para você sair do aluguel e morar perto de tudo.", 
    image: "/images/postAltusPromo.png", 
    primaryBtnText: "Quero Simular Agora",
    primaryBtnLink: "https://wa.me/5511988649386?text=Olá%20Roberto,%20quero%20fazer%20uma%20simulação%20pelo%20Minha%20Casa%20Minha%20Vida!",
    secondaryBtnText: "Ver Empreendimentos",
    secondaryBtnLink: "#imoveis",
    showWhatsAppIcon: false,
    showArrowIcon: true,
    hasOverlay: true,
    overlayClass: "from-primary/80 via-primary/50 to-transparent" 
  },
  {
    id: 3,
    badge: "Atendimento Direto com Especialista",
    title: "A Oportunidade Perfeita para Mudar de Vida",
    subtitle: "Condições exclusivas na Vivaz Residencial direto com quem entende.",
    description: "Saia do aluguel e viva centralizado em São Paulo. Fale agora mesmo com o consultor para fazer uma simulação sem compromisso.",
    image: "/images/image3_carro1.png", 
    primaryBtnText: "Falar com o Corretor",
    primaryBtnLink: "https://wa.me/5511988649386?text=Olá%20Roberto,%20gostaria%20de%20falar%20sobre%20as%20oportunidades%20da%20Vivaz",
    secondaryBtnText: "Tire suas dúvidas",
    secondaryBtnLink: "#contato",
    showWhatsAppIcon: true,
    showArrowIcon: false,
    hasOverlay: true,
    overlayClass: "from-primary/95 via-primary/80 to-primary/60"
  }
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [triggerReset, setTriggerReset] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length)
    }, 20000)
    
    return () => clearInterval(timer)
  }, [triggerReset])

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setTriggerReset(prev => prev + 1)
  }

  const currentBanner = BANNERS[currentIndex]

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentBanner.image}
              alt={typeof currentBanner.title === "string" ? currentBanner.title : "Banner Principal"}
              fill
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Condicional */}
        <AnimatePresence mode="wait">
          {currentBanner.hasOverlay && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 bg-gradient-to-r ${currentBanner.overlayClass || "from-primary/95 via-primary/80 to-primary/60"} z-10`}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 pt-24 pb-28 min-h-screen flex flex-col justify-center">
        <div className={`max-w-3xl w-full flex flex-col ${
          currentBanner.id === 2 
            ? "justify-center sm:my-auto md:mb-1 md:mr-auto md:items-start md:text-left" 
            : "sm:mb-12 md:mb-1"
        }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start text-left"
            >
              {/* Badge */}
              {currentBanner.badge && (
                <span className={`inline-block font-medium mb-4 tracking-wider uppercase text-sm ${
                  currentBanner.id === 2 ? "text-accent font-bold" : "text-white/80"
                }`}>
                  {currentBanner.badge}
                </span>
              )}

              {/* Main Title */}
              <h1 className="font-serif font-bold text-white leading-tight mb-6 text-4xl md:text-5xl lg:text-6xl">
                {currentBanner.title}
              </h1>

              {/* Subtitle */}
              {currentBanner.subtitle && (
                <p className="text-xl md:text-2xl text-white/95 mb-5 font-semibold">
                  {currentBanner.subtitle}
                </p>
              )}

              {/* Description */}
              {currentBanner.description && (
                <p className="text-lg text-white/85 mb-8 leading-relaxed max-w-2xl">
                  {currentBanner.description}
                </p>
              )}

              {/* Botões */}
              <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto ${
                currentBanner.id === 2 ? "mb-2 pb-6 md:pb-0" : "mb-6"
              }`}>
                <Link
                  href={currentBanner.primaryBtnLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 hover:scale-105 shadow-lg text-center"
                >
                  {currentBanner.showWhatsAppIcon && <WhatsAppIcon />}
                  {currentBanner.primaryBtnText}
                </Link>

                <Link
                  href={currentBanner.secondaryBtnLink}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-200 border shadow-md text-center ${
                    currentBanner.id === 2 
                      ? "bg-primary text-white border-primary hover:bg-primary/90" 
                      : "bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  {currentBanner.secondaryBtnText}
                  {currentBanner.showArrowIcon && <ArrowRightIcon />}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Telefone */}
          {currentBanner.id !== 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-3 transition-colors duration-300 text-white/90"
            >
              <PhoneIcon />
              <span className="text-lg font-medium">(11) 98864-9386</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Carrossel Dots */}
      <div className="absolute bottom-6 right-6 md:right-12 z-30 flex gap-2">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-accent scale-125 w-6" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Ir para o slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}