import index from "./config"
import dotenv from "dotenv";
dotenv.config();
export async function upsert(docs: any) {
    await index.namespace(process.env.PINECONE_INDEX!).upsert(docs)
}
