import { Request, Response, NextFunction } from "express";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
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
    const docs = await vectorStore.similaritySearch(query, 4);
    const docsPageContent = docs.map((d) => d.pageContent).join(" ");

    const promptTemplate = PromptTemplate.fromTemplate(
      "You are a helpful assistant that that can answer questions about youtube videos \
        based on the video's transcript.\
        Answer the following question: {userquery} \
        By searching the following video transcript: {docs} \
        Only use the factual information from the transcript to answer the question.\
        If you feel like you don't have enough information to answer the question, say `I don't know`. \
        Your answers should be verbose and detailed."
    );

    // const response = await promptTemplate.invoke({
    //   userquery: query,
    //   docs: docsPageContent,
    // });
    const model = new ChatOpenAI({
      model: "gpt-3.5-turbo",
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
