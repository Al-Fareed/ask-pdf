import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config();
const pineconeInstance = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
})

export default pineconeInstance;