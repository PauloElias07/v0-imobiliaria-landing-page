import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { token, nome, texto, avaliacao } = await request.json()
    const db = await connectDB()

    if (!token) {
      return NextResponse.json({ error: "Chave de acesso ausente." }, { status: 400 })
    }

    // 1. Procura se a chave existe e está ativa (usada: false)
    const chaveValida = await db.collection("chaves_acesso").findOne({ 
      token: token, 
      usada: false 
    })

    if (!chaveValida) {
      return NextResponse.json({ 
        error: "Este link de depoimento já foi utilizado ou é inválido." 
      }, { status: 403 })
    }

    // 2. Salva o depoimento na coleção oficial do site
    await db.collection("depoimentos").insertOne({
      nome: nome || chaveValida.nomeCliente,
      texto: texto,
      avaliacao: avaliacao || 5, // Ex: nota de 1 a 5 estrelas
      criadoEm: new Date()
    })

    // 3. Inutiliza a chave (pode deletar ou marcar como usada. Marcar como usada é melhor para histórico)
    await db.collection("chaves_acesso").updateOne(
      { token: token },
      { $set: { usada: true, usadaEm: new Date() } }
    )

    return NextResponse.json({ 
      status: "Sucesso", 
      message: "Obrigado! Seu depoimento foi publicado." 
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}