import { Request, Response, NextFunction } from "express";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import pineconeIndex from "../../shared/db/config";

export const queryPDF = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.body;

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex }
    );
      const results = await vectorStore.similaritySearch(query, 1);
      console.log(results);
      return res.status(200).json({
          data:results
      });
  } catch (error: any) {
    next(error);
  }
};
