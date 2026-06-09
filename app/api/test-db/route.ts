import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await connectDB()
    
    // Injeta a chave de acesso para o nosso teste do formulário
    await db.collection("chaves_acesso").insertOne({ 
      token: "porta123", 
      usada: false, 
      criadaEm: new Date() 
    })

    // Executa o comando de ping para checar se a conexão com o Atlas está viva
    await db.command({ ping: 1 })
    
    return NextResponse.json({ 
      status: "Sucesso!", 
      message: "Conexão estabelecida e chave 'porta123' criada com sucesso!" 
    })
  } catch (error: any) {
    console.error("Erro ao conectar no banco:", error)
    return NextResponse.json({ 
      status: "Erro", 
      message: "Não foi possível conectar ao banco de dados.",
      details: error.message 
    }, { status: 500 })
  }
}