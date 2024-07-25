import express, { Express } from "express";
const router = express.Router();
import { uploadPDF } from '../controllers/pdf-handler'
import { queryPDF } from '../controllers/user.query-handler'

router.post('/pdf-upload',uploadPDF)
router.post('/query',queryPDF)

export default router;