"use client"

import { useState, useEffect, use } from "react"
import { motion } from "framer-motion"
import { Star, CheckCircle, AlertTriangle, Loader2 } from "lucide-react"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function PaginaDepoimento({ searchParams }: PageProps) {
  // Desembrulha os parâmetros da URL de forma segura no Next.js
  const params = use(searchParams)
  const token = typeof params.chave === "string" ? params.chave : ""

  const [statusVerificacao, setStatusVerificacao] = useState<"carregando" | "valido" | "invalido">("carregando")
  const [nomeCliente, setNomeCliente] = useState("")
  const [texto, setTexto] = useState("")
  const [avaliacao, setAvaliacao] = useState(5)
  const [enviando, setEnviando] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [erro, setErro] = useState("")

  // Bloqueia o acesso imediatamente se o link não trouxer nenhuma chave na URL
  useEffect(() => {
    if (!token) {
      setStatusVerificacao("invalido")
    } else {
      setStatusVerificacao("valido")
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!texto.trim()) {
      setErro("Por favor, escreva o seu depoimento antes de enviar.")
      return
    }

    setEnviando(true)
    setErro("")

    try {
      // Dispara a requisição para a rota da API (app/api/depoimentos/criar/route.ts)
      const response = await fetch("/api/depoimentos/criar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          nome: nomeCliente,
          texto,
          avaliacao
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar o seu depoimento.")
      }

      setSucesso(true)
    } catch (err: any) {
      setErro(err.message)
      // Se a API avisar que o link já foi usado ou é falso, muda a tela para "inválido"
      if (err.message.includes("utilizado") || err.message.includes("expirou")) {
        setStatusVerificacao("invalido")
      }
    } finally {
      setEnviando(false)
    }
  }

  // 1. Tela de Carregamento Inicial
  if (statusVerificacao === "carregando") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    )
  }

  // 2. Tela de Erro se o Link for Inválido ou Já Utilizado
  if (statusVerificacao === "invalido") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl border border-slate-100"
        >
          <AlertTriangle className="mx-auto h-14 w-14 text-amber-500" />
          <h1 className="mt-4 text-2xl font-bold text-slate-800">Convite Expirado</h1>
          <p className="mt-2 text-slate-600">
            Este link de acesso já foi utilizado para enviar um depoimento ou não é mais válido no nosso sistema.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Agradecemos a sua preferência e parceria!
          </p>
        </motion.div>
      </div>
    )
  }

  // 3. Tela Principal do Formulário
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl border border-slate-100"
      >
        {sucesso ? (
          // Sub-tela exibida após clicar no botão e salvar no MongoDB com sucesso
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <CheckCircle className="mx-auto h-16 w-16 text-emerald-500" />
            <h2 className="mt-4 text-2xl font-bold text-slate-800">Depoimento Enviado!</h2>
            <p className="mt-2 text-slate-600">
              Sua avaliação foi salva no nosso sistema. Muito obrigado por dedicar seu tempo para compartilhar sua experiência!
            </p>
          </motion.div>
        ) : (
          // Formulário Ativo
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-800">Conte sua Experiência</h1>
              <p className="text-sm text-slate-500 mt-1">
                Sua avaliação honesta nos ajuda a crescer e aprimorar nossos serviços.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo Nome */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Seu Nome
                </label>
                <input
                  type="text"
                  placeholder="Ex: Roberto Elias"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-800"
                />
              </div>

              {/* Seleção de Estrelas */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sua Nota
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <button
                      key={estrela}
                      type="button"
                      onClick={() => setAvaliacao(estrela)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          estrela <= avaliacao 
                            ? "fill-amber-400 text-amber-400" 
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Área do Texto */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Seu Depoimento
                </label>
                <textarea
                  rows={4}
                  placeholder="Escreva aqui os pontos que você mais gostou no nosso atendimento e processo..."
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-800"
                />
              </div>

              {/* Mensagens de Feedback de Erro */}
              {erro && (
                <p className="text-sm font-medium text-red-600 text-center bg-red-50 p-2 rounded-lg border border-red-100">
                  {erro}
                </p>
              )}

              {/* Botão de Envio Dinâmico */}
              <button
                type="submit"
                disabled={enviando}
                className="w-full rounded-lg bg-orange-500 p-3 font-semibold text-white shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {enviando ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Salvando depoimento...
                  </>
                ) : (
                  "Publicar Avaliação"
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  )
}