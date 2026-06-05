import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ 
  variable: '--font-playfair', 
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Roberto Elias | Corretor de Imóveis em São Paulo',
  description: 'Especialista em apartamentos nas regiões da Saúde, Praça da Árvore, Vila Mariana e Jabaquara. Encontre o imóvel ideal com atendimento personalizado.',
  keywords: ['corretor de imóveis', 'apartamentos São Paulo', 'Saúde', 'Vila Mariana', 'Praça da Árvore', 'Jabaquara', 'imobiliária'],
  authors: [{ name: 'Roberto Elias' }],
  openGraph: {
    title: 'Roberto Elias | Corretor de Imóveis em São Paulo',
    description: 'Especialista em apartamentos nas regiões da Saúde, Praça da Árvore, Vila Mariana e Jabaquara.',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: 'index, follow',
}

export const viewport: Viewport = {
  themeColor: '#1a2744',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
