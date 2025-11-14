import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { AppError } from "../errors/AppError";

export async function onlyCandidates(req: Request, res: Response, next: NextFunction) {
  const userId = req.user_id;
  
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) throw new AppError("Usuário não encontrado", 404);
  
  if (user.userType !== "candidate") {
    throw new AppError('Apenas candidatos podem acessar esta página.', 403)
  }

  next();
}