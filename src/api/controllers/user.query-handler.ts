import { Request, Response, NextFunction } from "express";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import responseModel from "../../model/outputModel";
import dotenv from "dotenv";
import pineconeInstance from "../../shared/db/config";
import { Index } from "@pinecone-database/pinecone";
dotenv.config();
export const queryPDF = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {openAiModel, openaiApiKey,pineconeIndex,query } = req.body;
    const index:Index = pineconeInstance.Index(pineconeIndex)
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex:index }
    );
    const docs = await vectorStore.similaritySearch(query, 5);
    if (!docs) {
      throw new Error("It seems like no documents were found, Try uploading a pdf file")
    }
    const docsPageContent = docs.map((d) => d.pageContent).join(" ");

    const promptTemplate = PromptTemplate.fromTemplate(
      "You are a helpful assistant that that can answer questions on provided documents \
        based on the documents that are provided. Be within the boundary of provide document\
        Answer the following question: {userquery} \
        Based on the following provided documents: {docs} \
        If the documents doesnot have enough information or lacks in providing info \
        Respons ``` Not enough context ``` \
        Your answers should be verbose and very very detailed and must use simple english"
    );

    const model = new ChatOpenAI({
      model: openAiModel || 'gpt-3.5-turbo',
      apiKey: openaiApiKey!,
    });
    const structuredModel = model.withStructuredOutput(responseModel)

    const chain = promptTemplate.pipe(structuredModel);
    const response = await chain.invoke({
      userquery: query,
      docs: docsPageContent,
    })
    return res.status(200).json({
      data: response,
    });
  } catch (error: any) {
    next(error);
  }
};
