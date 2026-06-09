import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await connectDB()
    
    await db.collection("chaves_acesso").insertOne({ token: "porta123", usada: false, criadaEm: new Date() })

    // Executa um comando de "ping" no MongoDB Atlas
    await db.command({ ping: 1 })
    
    return NextResponse.json({ 
      status: "Sucesso!", 
      message: "Conexão com o MongoDB 'portacerta' estabelecida com sucesso!" 
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