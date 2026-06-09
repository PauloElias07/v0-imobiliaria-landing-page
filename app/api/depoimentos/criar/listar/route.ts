import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

// ⚡ Força o Next.js a rodar essa rota do zero a cada requisição (Desativa o Cache)
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const db = await connectDB()

    const depoimentosReais = await db
      .collection("depoimentos")
      .find({})
      .sort({ criadoEm: -1 })
      .toArray()

    return NextResponse.json(depoimentosReais)
  } catch (error: any) {
    console.error("Erro na API de listagem:", error)
    return NextResponse.json({ error: "Erro ao listar depoimentos" }, { status: 500 })
  }
}