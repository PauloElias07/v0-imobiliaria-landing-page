import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { nome, texto, avaliacao, imovel, chave } = await request.json()

    if (!chave) {
      return NextResponse.json({ erro: "Chave de acesso não fornecida." }, { status: 401 })
    }

    const db = await connectDB()
    const colChaves = db.collection("chaves_acesso")
    const colDepoimentos = db.collection("depoimentos")

    // 1. Busca a chave no banco de dados
    const chaveValida = await colChaves.findOne({ codigo: chave })

    // 2. Se a chave não existir ou já tiver sido usada, barra o envio na hora
    if (!chaveValida) {
      return NextResponse.json({ erro: "Chave inválida ou inexistente." }, { status: 403 })
    }
    
    if (chaveValida.utilizada === true) {
      return NextResponse.json({ erro: "Esta chave já foi utilizada por outro cliente." }, { status: 403 })
    }

    // 3. Salva o depoimento do cliente
    const resultado = await colDepoimentos.insertOne({
      nome,
      texto,
      avaliacao: Number(avaliacao) || 5,
      imovel,
      dataCriacao: new Date()
    })

    // 4. 🔥 QUEIMA A CHAVE: Atualiza o status dela para utilizada no banco de dados
    await colChaves.updateOne(
      { _id: chaveValida._id },
      { $set: { utilizada: true, dataUtilizacao: new Date() } }
    )

    return NextResponse.json({ inserido: true }, { status: 201 })
  } catch (error) {
    console.error("Erro ao validar chave e salvar depoimento:", error)
    return NextResponse.json({ erro: "Erro interno no servidor." }, { status: 500 })
  }
}