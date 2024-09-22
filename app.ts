import express, { Express,Request, Response } from "express";
import { start } from './src/shared/utils/server';
import bodyParser from "body-parser";
const cookieParser = require("cookie-parser");
import cors from "cors";
import multer from "multer";
import pdfroute from './src/api/routes/pdf-routes';
import fileroute from './src/api/routes/file-routes';
import { fileHanlder } from "./src/middlewares/check-pdf";
import { errorHandler } from "./src/middlewares/error.handler";
const app: Express = express();
const upload = multer({ dest: 'uploads/' })

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/files",upload.single('pdf'), fileHanlder, fileroute, errorHandler);
app.use("/pdf", pdfroute);

app.get("/", (req: Request, res: Response) => {
   return res.json({
      message:"Your application is running"
  });
});


const port: number = 8000;
start(app,port); 