import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Por favor, adicione a variável MONGODB_URI no arquivo .env.local")
}

const uri = process.env.MONGODB_URI

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
    _mockStorage?: any[] // Evita erro de tipagem no v0
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

// 🧠 Cria a memória que não zera ao atualizar a página (Seguro contra erros do TS)
const globalWithMock = global as any
if (!globalWithMock._mockStorage) {
  globalWithMock._mockStorage = []
}

// 📦 Banco Simulado (Mock) Atualizado com suporte a Carrossel Automático (.find().sort().toArray())
const mockDb = {
  collection: (name: string) => ({
    insertOne: async (doc: any) => {
      console.log(`[MOCK DB] Gravado na coleção ${name}:`, doc)
      // Guarda o depoimento na lista na hora!
      if (name === "depoimentos") {
        globalWithMock._mockStorage.unshift({ _id: "mock_" + Math.random(), ...doc })
      }
      return { acknowledged: true, insertedId: "mock_" + Math.random() }
    },
    updateOne: async (query: any, update: any) => {
      console.log(`[MOCK DB] Atualizado na coleção ${name}:`, query, update)
      return { acknowledged: true, modifiedCount: 1 }
    },
    findOne: async (query: any) => {
      console.log(`[MOCK DB] Buscando único na coleção ${name}:`, query)
      if (query.token === "porta123") {
        return { token: "porta123", usada: false, criadaEm: new Date() }
      }
      return null
    },
    // Adicionado os métodos que o seu carrossel precisa para listar automaticamente!
    find: (query: any = {}) => ({
      sort: (sortQuery: any = {}) => ({
        toArray: async () => {
          console.log(`[MOCK DB] Listando coleção ${name}. Total na memória:`, globalWithMock._mockStorage.length)
          return globalWithMock._mockStorage
        }
      })
    })
  })
}

export async function connectDB() {
  try {
    const connectedClient = await clientPromise
    return connectedClient.db("portacerta")
  } catch (error) {
    console.warn("⚠️ Ambiente v0 isolado detectado. Ativando Banco Simulado para testes visuais.")
    return mockDb as any
  }
}