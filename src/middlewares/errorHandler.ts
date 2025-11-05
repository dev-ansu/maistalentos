import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../errors/AppError";
import { NextFunction, Request, Response } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return ApiResponse.error(res, err.message, err.statusCode);
  }

  console.error(err);

  return ApiResponse.error(
    res,
    "Erro interno do servidor",
    500
  );
}