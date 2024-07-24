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
      const docs = await vectorStore.similaritySearch(query, 4);
      const docsPageContent = docs.map((d) => d.pageContent).join(" ");
      return res.status(200).json({
        data: docsPageContent,
      });
  } catch (error: any) {
    next(error);
  }
};
