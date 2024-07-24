import { Request, Response, NextFunction } from "express";
export function validatePDF(req: Request, res: Response, next: NextFunction) {
  try {
    const {filepath} = req.body;
    if (!filepath.endsWith(".pdf")) {
      throw new Error("Please upload file with extension 'pdf'");
    }
    next();
  } catch (error: any) {
      next(error)
  }
}
