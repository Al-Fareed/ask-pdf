import index from "./config"

export async function upsert(docs: any) {
    await index.namespace("pdfdb").upsert(docs)
}
