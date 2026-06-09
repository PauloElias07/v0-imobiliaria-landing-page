import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export const dynamic = "force-dynamic" // Garante que novos depoimentos apareçam na hora

export async function GET() {
  try {
    const db = await connectDB()
    
    // Busca os depoimentos do mais recente para o mais antigo
    const listaDepoimentos = await db
      .collection("depoimentos")
      .find({})
      .sort({ criadoEm: -1 })
      .toArray()

    return NextResponse.json(listaDepoimentos)
  } catch (error: any) {
    console.error("Erro ao listar depoimentos:", error)
    return NextResponse.json([], { status: 500 })
  }
}