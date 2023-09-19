import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeGetUserIdByEmailUseCase } from "@/use-cases/factories/make-get-user-id-by-email";
import { NextFunction, Request, Response } from "express";

export async function getUserIdByEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const getUserIdUseCase = makeGetUserIdByEmailUseCase();

    const { email } = req.params;

    const user_id = await getUserIdUseCase.execute({
      email,
    });

    return res.status(200).send(user_id);
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
