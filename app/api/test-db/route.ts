import { NextResponse } from "next/server"
import { connectDB } from "@/lib/supabase"

export async function GET() {
  try {
    const db = await connectDB()

    // Injeta a chave de acesso simulada ou real
    await db.collection("chaves_acesso").insertOne({
      token: "porta123",
      usada: false,
      criadoEm: new Date()
    })

    return NextResponse.json({
      status: "Sucesso!",
      message: "Sistema pronto! A chave 'porta123' foi disponibilizada para o teste."
    })
  } catch (error: any) {
    return NextResponse.json({
      status: "Erro",
      message: "Erro interno na rota de testes.",
      details: error.message
    }, { status: 500 })
  }
}