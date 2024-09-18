import { Request, Response, NextFunction } from "express";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import responseModel from "../../model/outputModel";
import pineconeIndex from "../../shared/db/config";
import dotenv from "dotenv";
dotenv.config();
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
    const docs = await vectorStore.similaritySearch(query, 5);
    if(!docs){
      throw new Error("It seems like no documents were found, Try uploading a pdf file")
    }
    const docsPageContent = docs.map((d) => d.pageContent).join(" ");

    const promptTemplate = PromptTemplate.fromTemplate(
      "You are a helpful assistant that that can answer questions on provided data \
        based on the documents that are provided. Be within the boundary of provide document\
        Answer the following question: {userquery} \
        Based on the following provided transcript: {docs} \
        If the transcipt doesnot have enough information or lacks in providing info \
        Respons ``` Not enough context ``` \
        Your answers should be verbose and detailed."
    );

    // const response = await promptTemplate.invoke({
    //   userquery: query,
    //   docs: docsPageContent,
    // });
    const model = new ChatOpenAI({
      model: process.env.MODEL,
      apiKey: process.env.OPENAI_API_KEY!,
    });
    const structuredModel = model.withStructuredOutput(responseModel)
    // const parser = new StringOutputParser();

    const chain = promptTemplate.pipe(structuredModel);
     const response =  await chain.invoke({userquery: query,
      docs: docsPageContent,})
    return res.status(200).json({
      data: response,
    });
  } catch (error: any) {
    next(error);
  }
};
