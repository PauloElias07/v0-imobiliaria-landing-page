"use client"

import { useState } from "react"

const SENHA = "adv220565"
const BASE_URL = "https://www.portacertaconsultoria.com.br/depoimento?chave="

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false)
  const [senhaInput, setSenhaInput] = useState("")
  const [erroSenha, setErroSenha] = useState(false)
  const [nome, setNome] = useState("")
  const [link, setLink] = useState("")
  const [chave, setChave] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")
  const [copiado, setCopiado] = useState(false)
  const [historico, setHistorico] = useState<{ nome: string; chave: string; link: string }[]>([])

  function login() {
    if (senhaInput === SENHA) {
      setAutenticado(true)
      setErroSenha(false)
    } else {
      setErroSenha(true)
    }
  }

  async function gerarChave() {
    setCarregando(true)
    setErro("")
    setLink("")
    setChave("")

    try {
      const res = await fetch("/api/depoimentos/criar-chave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome || "Cliente" }),
      })

      if (!res.ok) throw new Error("Erro ao criar chave")
      const data = await res.json()

      const novaChave = data.chave
      const novoLink = BASE_URL + novaChave

      setChave(novaChave)
      setLink(novoLink)
      setHistorico((h) => [{ nome: nome || "—", chave: novaChave, link: novoLink }, ...h])
      setNome("")
    } catch {
      setErro("Não foi possível gerar a chave. Verifique a API.")
    }

    setCarregando(false)
  }

  function copiar(texto: string) {
    navigator.clipboard.writeText(texto).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 1500)
    })
  }

  if (!autenticado) {
    return (
      <div style={styles.page}>
        <div style={styles.loginCard}>
          <h1 style={styles.titulo}>Painel Admin</h1>
          <p style={styles.sub}>Porta Certa Consultoria</p>
          <input
            type="password"
            placeholder="Senha"
            value={senhaInput}
            onChange={(e) => setSenhaInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            style={styles.input}
          />
          {erroSenha && <p style={styles.erro}>Senha incorreta.</p>}
          <button onClick={login} style={styles.btn}>Entrar</button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.titulo}>Painel Admin</h1>
        <p style={styles.sub}>Gerar link de depoimento</p>

        <div style={styles.card}>
          <label style={styles.label}>Nome do cliente (opcional)</label>
          <input
            type="text"
            placeholder="Ex: João Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && gerarChave()}
            style={styles.input}
          />
          <button onClick={gerarChave} disabled={carregando} style={styles.btn}>
            {carregando ? "Gerando..." : "Gerar chave e link"}
          </button>
          {erro && <p style={styles.erro}>{erro}</p>}
        </div>

        {link && (
          <div style={styles.card}>
            <label style={styles.label}>Link gerado — copie e envie ao cliente</label>
            <div style={styles.linkBox}>
              <span style={{ flex: 1, wordBreak: "break-all", fontSize: 13 }}>{link}</span>
              <button onClick={() => copiar(link)} style={styles.btnCopiar}>
                {copiado ? "✓ copiado" : "copiar"}
              </button>
            </div>
            <p style={styles.chaveTexto}>chave: {chave}</p>
          </div>
        )}

        {historico.length > 0 && (
          <div style={styles.card}>
            <label style={styles.label}>Chaves geradas nesta sessão</label>
            {historico.map((h, i) => (
              <div key={i} style={styles.historicoItem}>
                <div>
                  <p style={styles.historicoNome}>{h.nome}</p>
                  <p style={styles.mono}>{h.chave.substring(0, 18)}…</p>
                </div>
                <button onClick={() => copiar(h.link)} style={styles.btnCopiar}>copiar link</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f4f4f4",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "3rem 1rem",
  },
  container: { width: "100%", maxWidth: 560 },
  loginCard: {
    background: "#fff",
    borderRadius: 12,
    padding: "2rem",
    width: "100%",
    maxWidth: 360,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: "1.25rem 1.5rem",
    marginBottom: "1rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  titulo: { fontSize: 22, fontWeight: 500, margin: "0 0 4px", color: "#1a2744" },
  sub: { fontSize: 14, color: "#888", margin: "0 0 1.5rem" },
  label: { fontSize: 13, color: "#666", display: "block", marginBottom: 8 },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 14,
    marginBottom: 12,
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#1a2744",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
  },
  btnCopiar: {
    padding: "6px 12px",
    fontSize: 12,
    border: "1px solid #ddd",
    borderRadius: 6,
    background: "#fff",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  linkBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f8f8f8",
    border: "1px solid #eee",
    borderRadius: 8,
    padding: "10px 12px",
  },
  chaveTexto: { fontSize: 12, color: "#aaa", marginTop: 8, fontFamily: "monospace" },
  historicoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #f0f0f0",
  },
  historicoNome: { fontSize: 13, fontWeight: 500, margin: 0 },
  mono: { fontSize: 12, color: "#aaa", fontFamily: "monospace", margin: 0 },
  erro: { fontSize: 13, color: "#c0392b", marginTop: 8 },
}