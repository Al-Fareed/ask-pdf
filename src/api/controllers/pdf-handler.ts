import { Request, Response,NextFunction } from "express";
import { extractPDF } from "../../db/vector-store";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import pineconeIndex from "../../shared/db/config";
import dotenv from "dotenv";
dotenv.config();
export const uploadPDF = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { filepath } = await req.body;
    const docs = await extractPDF(filepath);
    // const pinecone = new Pinecone({
    //   apiKey: process.env.PINECONE_API_KEY!,
    // });

    // const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);    
    await PineconeStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY!,
        model: process.env.MODEL,
      }),
      {
        pineconeIndex,
        maxConcurrency: 5, 
      }
    );

    return res.status(200).json({
      message: "uploaded successfully",
      docs,
    });
  } catch (error: any) {
    console.log("Got error", error.message);
    res.status(400);
    next(error)
  }
};

export const queryPDF = async (req:Request, res:Response,next:NextFunction) => {
  try {
    const { query } = req.body;
    
  } catch (error:any) {
    next(error)
  }
}