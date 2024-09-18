import express, { Express } from "express";
const router = express.Router();
import { uploadPDF } from '../controllers/pdf-handler'

router.post('/pdf-upload',uploadPDF)

export default router;