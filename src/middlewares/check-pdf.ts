import { Request, Response, NextFunction } from "express";
export function fileHanlder(req: Request, res: Response, next: NextFunction) {
  try {
    const file = req.file;
    console.log("File uploaded is ",file);
    
    if (!file) {
      throw new Error("Please upload file");
    }else if(file.fieldname !== 'pdf'){
      throw new Error("Upload a pdf file")
    }
    next();
  } catch (error: any) {
      next(error)
  }
}
