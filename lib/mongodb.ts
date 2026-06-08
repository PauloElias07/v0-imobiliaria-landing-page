import { MongoClient } from "mongodb"

const uri =
  "mongodb+srv://portacerta:22056571.tc7mjsa.mongodb.net/?retryWrites=true&w=majority&appName=PortaCerta"

const client = new MongoClient(uri)

export async function connectDB() {
  if (!client.topology?.isConnected()) {
    await client.connect()
  }

  return client.db("portacerta")
}