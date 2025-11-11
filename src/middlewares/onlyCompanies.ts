import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { AppError } from "../errors/AppError";

export async function onlyCompanies(req: Request, res: Response, next: NextFunction) {
  const userId = req.user_id;
  
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  
  if (user.userType !== "company") {
    throw new AppError('Apenas candidatos podem acessar esta página.', 403)
  }

  next();
}