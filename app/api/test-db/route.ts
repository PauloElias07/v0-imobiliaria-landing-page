import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, nome, texto, avaliacao } = body

    const db = await connectDB()

    // 1. Salva o depoimento enviado pelo cliente
    await db.collection("depoimentos").insertOne({
      nome,
      texto,
      avaliacao,
      tokenOrigem: token,
      criadoEm: new Date()
    })

    // 2. Marca a chave de acesso como usada para que ninguém mais use o mesmo link
    await db.collection("chaves_acesso").updateOne(
      { token: token },
      { $set: { usada: true, usadoEm: new Date() } }
    )

    return NextResponse.json({ success: true, message: "Depoimento salvo com sucesso!" })
  } catch (error: any) {
    console.error("Erro na API de criação:", error)
    return NextResponse.json({ error: "Erro interno ao salvar depoimento." }, { status: 500 })
  }
}