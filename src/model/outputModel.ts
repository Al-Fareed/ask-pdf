import { z } from "zod";

const responseModel = z.object({
  answer: z.string().describe("Answer for the user query"),
  highlights: z.array(z.string()).describe("Important key points from answer"),
});

export default responseModel;