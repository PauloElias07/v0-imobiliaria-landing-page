import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { randomUUID } from "crypto"

const API_URL = '/api/depoimentos/criar_chave';

export async function POST(request: Request) {
  try {
    const { nome } = await request.json()

    const chave = randomUUID()

    const db = await connectDB()
    const colChaves = db.collection("chaves_acesso")

    await colChaves.insertOne({
      codigo: chave,
      utilizada: false,
      nomeCliente: nome || "Cliente",
      dataCriacao: new Date()
    })

    return NextResponse.json({ chave }, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar chave:", error)
    return NextResponse.json({ erro: "Erro interno no servidor." }, { status: 500 })
  }
}