import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, nome, texto, avaliacao } = body

    // Salva direto na tabela do Supabase
    const { error } = await supabase
      .from('depoimentos')
      .insert([
        { 
          nome, 
          texto, 
          avaliacao: Number(avaliacao) || 5, 
          token_origem: token 
        }
      ])

    if (error) throw error

    return NextResponse.json({ success: true, message: "Salvo no Supabase!" })
  } catch (error: any) {
    console.error("Erro ao criar depoimento:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}