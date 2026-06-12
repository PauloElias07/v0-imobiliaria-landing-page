import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Puxa os dados direto do Supabase ordenando pelos mais novos
    const { data: depoimentos, error } = await supabase
      .from('depoimentos')
      .select('*')
      .order('criated_at' in (await supabase.from('depoimentos').select('*').limit(1)).data?.[0] ? 'created_at' : 'criado_em', { ascending: false })

    if (error) {
      // Caso a ordenação por 'criado_em' falhe por conta do nome na tabela SQL, busca padrão
      const { data: fallbackData } = await supabase.from('depoimentos').select('*')
      return NextResponse.json(fallbackData || [])
    }

    return NextResponse.json(depoimentos || [])
  } catch (error: any) {
    console.error("Erro ao listar depoimentos:", error)
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}