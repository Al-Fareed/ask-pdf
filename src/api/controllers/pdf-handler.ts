import { Request, Response, NextFunction } from "express";
import { extractPDF } from "../../db/vector-store";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import pineconeInstance from "../../shared/db/config";
import dotenv from "dotenv";
dotenv.config();

export const uploadPDF = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    const { openaiApiKey, openaiModel } = req.body
    const indexName = file?.originalname.split('.')[0].toLowerCase();

    const docs = await extractPDF(file?.path!);

    const pinecone = pineconeInstance

    const existingIndexesResponse = await pinecone.listIndexes();
    console.log(existingIndexesResponse);

    const existingIndexes = existingIndexesResponse?.indexes ?? [];

    const indexExists = existingIndexes.some((index) => index.name === indexName);

    if (!indexExists) {
      await pinecone.createIndex({
        name: indexName!,
        dimension: 1536,
        spec: {
          serverless: { cloud: "aws", region: "us-east-1" }
        },
        deletionProtection: 'disabled',
      });
    } else {
      return res.json({
        message: "This pdf is already uploaded"
      })
    }

    const pineconeIndex = pinecone.Index(indexName!);

    await PineconeStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({
        apiKey: openaiApiKey,
        model: openaiModel,
      }),
      {
        pineconeIndex,
        maxConcurrency: 5,
      }
    );

    return res.status(200).json({
      message: indexName + " Uploaded Successfully..!",
    });
  } catch (error: any) {
    console.log("Got error", error.message);
    res.status(400);
    next(error);
  }
};
