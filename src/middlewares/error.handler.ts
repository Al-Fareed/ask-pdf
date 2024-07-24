import { Response, Request, NextFunction } from "express";
export function errorHandler(error:any,req:Request,res:Response,next:NextFunction) {
    res.status(400).json({
      error: `Internal server error : ${error}`,
    });
}