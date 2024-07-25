import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
export async function extractPDF(filepath: string) {
  const loader = new PDFLoader(filepath);
  const pdfContent: any = await loader.load();
  return pdfContent;
}
