import { NextResponse } from "next/server"

export async function GET() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    return NextResponse.json({
      status: "Erro",
      message: "A variável MONGODB_URI não foi encontrada no ambiente do v0!"
    }, { status: 400 })
  }

  // Ofusca a senha para mostrar no teste com segurança
  const uriSegura = uri.replace(/:([^@]+)@/, ":******@")

  return NextResponse.json({
    status: "Variável encontrada!",
    preview: uriSegura,
    mensagem: "O Next.js está lendo a variável corretamente. Agora certifique-se de que o usuário/senha nela estão certos."
  })
}