"use client"

import { useEffect, useState } from "react"
import { Star, ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Depoimentos padrão caso o banco esteja vazio
const fallbackTestimonials = [
  {
    name: "Ricardo Silva",
    location: "Imóvel: Viccino",
    text: "Excelente atendimento! Conseguiu encontrar o imóvel perfeito para a minha família em tempo recorde e com total transparência.",
    rating: 5
  },
  {
    name: "Mariana Costa",
    location: "Imóvel: Vila Ares",
    text: "Profissional extremamente qualificado. Todo o processo de documentação e transação imobiliária foi feito com muita segurança.",
    rating: 5
  },
  {
    name: "Carlos Eduardo",
    location: "Imóvel: Altus",
    text: "O melhor corretor imobiliário que já encontrei. Suporte do início ao fim e total dedicação em conseguir as melhores condições.",
    rating: 5
  }
]

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>(fallbackTestimonials)
  const [loading, setLoading] = useState(true)
  
  // Estado para controlar a página atual do carrossel e a direção da animação
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0) // -1 para esquerda, 1 para direita
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // NOVO: Estado para armazenar o depoimento selecionado que abrirá no Modal
  const [activeTestimonial, setActiveTestimonial] = useState<any | null>(null)

  // Monitora o tamanho da tela para ajustar a quantidade de itens visíveis
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1) // Celular: 1 por vez
        setPage(0)
      } else {
        setItemsPerPage(3) // Computador: Até 3 por vez
        setPage(0)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/depoimentos/listar")
        if (response.ok) {
          const data = await response.json()
          
          if (data && data.length > 0) {
            const formatted = data.map((item: any) => ({
              name: item.nome || "Cliente Anônimo",
              location: item.imovel ? `Imóvel: ${item.imovel}` : "Cliente Verificado", 
              text: item.texto || "",
              rating: Number(item.avaliacao) || 5,
            }))

            if (formatted.length < 3) {
              setTestimonials([...formatted, ...fallbackTestimonials])
            } else {
              setTestimonials(formatted)
            }
          } else {
            setTestimonials(fallbackTestimonials)
          }
        } else {
          setTestimonials(fallbackTestimonials)
        }
      } catch (error) {
        console.error("Erro ao carregar depoimentos do banco:", error)
        setTestimonials(fallbackTestimonials)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Limita a exibição total a 10 depoimentos
  const limitedTestimonials = testimonials.slice(0, 10)

  // Calcula o total de páginas reais sem repetição de conteúdo
  const totalPages = Math.ceil(limitedTestimonials.length / itemsPerPage)

  const nextPage = () => {
    setDirection(1)
    setPage((prev) => (prev + 1 >= totalPages ? 0 : prev + 1))
  }

  const prevPage = () => {
    setDirection(-1)
    setPage((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1))
  }

  // Descobre quais depoimentos pertencem estritamente à página atual
  const startIndex = page * itemsPerPage
  const visibleTestimonials = limitedTestimonials.slice(startIndex, startIndex + itemsPerPage)

  // Variantes de animação para o efeito de deslizar (Framer Motion)
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0
    })
  }

  return (
    <section id="depoimentos" className="py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A satisfação de quem escolheu Roberto Elias para realizar o sonho do imóvel próprio ou fazer um investimento seguro.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10 text-slate-500">Carregando depoimentos...</div>
        ) : (
          <div className="relative px-2 md:px-12">
            
            {/* Container animado com AnimatePresence */}
            <div className="relative min-h-[19rem]">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  className={`grid gap-8 w-full ${
                    itemsPerPage === 1 ? "grid-cols-1" : "grid-cols-3"
                  }`}
                >
                  {visibleTestimonials.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between min-h-[18rem] h-full w-full"
                    >
                      <div>
                        <div className="flex text-amber-400 mb-4">
                          {Array.from({ length: item.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                        <div className="relative">
                          <p className="text-slate-600 dark:text-slate-300 italic mb-2 line-clamp-4 text-sm">
                            "{item.text}"
                          </p>
                          {/* Botão de expansão condicional (exibido apenas se o texto for longo) */}
                          {item.text.length > 160 && (
                            <button
                              onClick={() => setActiveTestimonial(item)}
                              className="text-xs text-orange-500 font-semibold hover:underline block mb-4 cursor-pointer"
                            >
                              Ler depoimento completo
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="mt-auto">
                        <h4 className="font-semibold text-slate-800 dark:text-white text-sm">
                          {item.name}
                        </h4>
                        <span className="text-sm text-slate-400">
                          {item.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Setas Laterais de Navegação */}
            {totalPages > 1 && (
              <div className="flex justify-center md:justify-between items-center mt-8 md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:right-0 md:mt-0 gap-6 z-10">
                <button
                  onClick={prevPage}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 p-3 rounded-full shadow-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextPage}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 p-3 rounded-full shadow-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                  aria-label="Próxima página"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Indicadores de Páginas em Bolinhas (Dots) */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > page ? 1 : -1)
                      setPage(i)
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      page === i ? "w-6 bg-orange-500" : "w-2 bg-slate-300 dark:bg-slate-600"
                    }`}
                    aria-label={`Ir para a página ${i + 1}`}
                  />
                ))}
              </div>
            )}

          </div>
        )}
      </div>

      {/* MODAL DO DEPOIMENTO COMPLETO */}
      <AnimatePresence>
        {activeTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop escurecido de fundo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTestimonial(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Caixa de Conteúdo do Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl max-w-lg w-full relative z-10 border border-slate-100 dark:border-slate-700 overflow-hidden max-h-[85vh] flex flex-col"
            >
              {/* Botão de Fechar */}
              <button
                onClick={() => setActiveTestimonial(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full p-1 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Fechar depoimento"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Estrelas */}
              <div className="flex text-amber-400 mb-4">
                {Array.from({ length: activeTestimonial.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Texto Inteiro com Scroll Interno Próprio (Evita aumentar o scroll da página do site) */}
              <div className="overflow-y-auto pr-2 mb-6 flex-1 text-slate-700 dark:text-slate-200 text-base leading-relaxed italic">
                "{activeTestimonial.text}"
              </div>

              {/* Assinatura do Autor */}
              <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {activeTestimonial.name}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {activeTestimonial.location}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}