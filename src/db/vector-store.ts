import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
export async function extractPDF(filepath: string) {
  const loader = new PDFLoader(filepath);
  const pdfContent: any = await loader.load();

  // let combinedPageContent = '';
  // for (const content of pdfContent) {
  //   combinedPageContent += content.doc.pdfContent + " ";
  // }
    
  return pdfContent;
}

// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 1000,
//   chunkOverlap: 4,
// });
// const docs = await splitter.splitDocuments([
//   new Document({ pageContent: pdfContent }),
// ]);


/**
 * [
  Document {
    pageContent: 'Gayathri Mohan\n' +
      'Foreword by Dr. Rebecca Parsons\n' +
      'Full Stack \n' +
      'Te s t i n g\n' +
      'A Practical Guide for  \n' +
      'Delivering High Quality Software\n' +
      'Mohan\n' +
      'Compliments of',
    metadata: {
      source: '/Users/testvagrant/Downloads/full stack testing by gayathri mohan.pdf',
      pdf: [Object],
      loc: [Object]
    },
    id: undefined
  },
  Document {
    pageContent: '“Gayathri’s book \n' +
      'provides the necessary \n' +
      'perspective for teams \n' +
      'to understand a holistic \n' +
      'view of testing.”\n' +
      ' —Neal  Ford\n' +
      'Director/Software Architect/Meme \n' +
      'Wrangler at Thoughtworks; Author of \n' +
      'Software Architecture: The Hard Parts\n' +
      '“Gayathri’s book should \n' +
      'find its way to the \n' +
      'desktops of people who \n' +
      'write (and, therefore, are \n' +
      'bound to test) software.”\n' +
      '—Saleem Siddiqui\n' +
      'Author of Learning Test-Driven \n' +
      'Development\n' +
      'SOFTWARE DEVELOPMENT\n' +
      'Full Stack Testing\n' +
      'US $59.99  CAN $74.99\n' +
      'ISBN: 978-1-098-10813-7\n' +
      'Twitter: @oreillymedia\n' +
      'linkedin.com/company/oreilly-media\n' +
      'youtube.com/oreillymedia \n' +
      'Testing is a critical discipline for any organization looking to \n' +
      'deliver high-quality software. This practical book provides \n' +
      'software developers and QA engineers with a comprehensive \n' +
      'one-stop guide to testing skills in 10 different categories. \n' +
      'You’ll learn appropriate strategies, concepts, and practical \n' +
      'implementation knowledge you can apply from both a \n' +
      'development and a testing perspective for web and mobile \n' +
      'applications.\n' +
      'Author Gayathri Mohan offers examples of more than 40 \n' +
      'tools you can use immediately. Software testing professionals \n' +
      'and beginners alike will acquire the skills to conduct tests for \n' +
      'performance, security, and accessibility, including exploratory \n' +
      'testing, test automation, cross-functional testing, data \n' +
      'testing, mobile testing, and more. You’ll also learn to combine \n' +
      'them in continuous integration pipelines to gain faster \n' +
      'feedback. With this guide, you’ll be able to tackle challenging \n' +
      'development workflows with a focus on quality.\n' +
      'With this book, you will:\n' +
      '•   Learn how to employ various testing types to yield maximum \n' +
      'quality in your projects\n' +
      '•   Explore new testing methods by following the book’s \n' +
      'strategies and concepts\n' +
      '•   Learn how to apply these tools at work by following detailed \n' +
      'examples\n' +
      '•   Improve your skills and job prospects by gaining a broad \n' +
      'exposure to testing best practices\n' +
      'Gayathri Mohan is a principal \n' +
      'consultant at Thoughtworks, where \n' +
      'she manages large quality assurance \n' +
      '(QA) teams for clients. A passionate \n' +
      'technology leader with expertise \n' +
      'across multiple software development \n' +
      'roles and technical and industrial \n' +
      'domains, she also served as the \n' +
      'company’s global QA SME and as office \n' +
      'tech principal.\n' +
      'Mohan\n' +
      ' \n' +
      'ISBN: 978-1-098-13317-7',
    metadata: {
      source: '/Users/testvagrant/Downloads/full stack testing by gayathri mohan.pdf',
      pdf: [Object],
      loc: [Object]
    },
    id: undefined
  },
  Document {
    pageContent: 'Praise for Full Stack Testing\n' +
      'From manual exploratory testing to creating test strategies across various quality\n' +
      'dimensions and working with emerging technologies, this book covers a lot of ground for\n' +
      'beginner as well as experienced quality analysts. Gayathri has done a phenomenal job of\n' +
      'distilling just enough theory to introduce the topic and follow it with practical examples\n' +
      'so you can apply them in your projects with existing tools and frameworks.\n' +
      '—Bharani Subramaniam, head of technology for\n' +
      'Thoughtworks India\n' +
      'An expansive survey of testing strategies and patterns that covers its subject in both\n' +
      'breadth and depth. The theoretical underpinnings of various forms of testing are backed\n' +
      'by practical, hands-on examples in several chapters. Gayathri’s book should find its way to\n' +
      'the desktops of people who write (and, therefore, are bound to test) software.\n' +
      '—Sale
 */