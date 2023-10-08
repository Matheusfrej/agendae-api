import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { NextFunction, Request, Response } from "express";

export async function getColors(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const colors = [
      { key: "purple", value: "Roxo" },
      { key: "green", value: "Verde" },
      { key: "red", value: "Vermelho" },
      { key: "yellow", value: "Amarelo" },
      { key: "cyan", value: "Ciano" },
      { key: "blue", value: "Azul" },
    ];

    return res.status(200).send(colors);
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
