import express, { Express,Request, Response } from "express";
import { start } from './src/shared/utils/server';
import bodyParser from "body-parser";
const cookieParser = require("cookie-parser");
import cors from "cors";
import pdfroute from './src/api/routes/pdf-routes'
import { validatePDF } from "./src/middlewares/check-pdf";
import { errorHandler } from "./src/middlewares/error.handler";
const app: Express = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", validatePDF, pdfroute, errorHandler);

app.get("/", (req: Request, res: Response) => {
   return res.json({
      message:"Hello"
  });
});


const port: number = 8000;
start(app,port); 