import express, { Express } from "express";
const router = express.Router();
import { queryPDF } from '../controllers/user.query-handler'

router.post('/query',queryPDF)

export default router;