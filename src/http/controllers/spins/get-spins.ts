import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeGetSpinsUseCase } from "@/use-cases/factories/make-get-spins-use-case";
import { NextFunction, Request, Response } from "express";

export async function getSpins(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const spinsUseCase = makeGetSpinsUseCase();

    const { user_id } = req.body.user_id;

    const spins = await spinsUseCase.execute({
      user_id,
    });

    return res.status(200).send(spins);
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
