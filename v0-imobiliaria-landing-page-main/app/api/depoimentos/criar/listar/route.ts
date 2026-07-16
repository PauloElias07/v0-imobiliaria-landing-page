import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const db = await connectDB()

    // Busca os depoimentos trazendo os mais recentes primeiro
    const depoimentos = await db
      .collection("depoimentos")
      .find({})
      .sort({ criado_em: -1 })
      .toArray()

    return NextResponse.json(depoimentos || [])
  } catch (error: any) {
    console.error("Erro ao listar depoimentos do Mongo:", error)
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}