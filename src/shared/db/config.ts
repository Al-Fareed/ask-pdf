import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: "17a14090-9886-4aca-8cc2-42b6a5cef8c9" });
const index = pc.index("pdfdb");

export default index;