import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeChangePasswordUseCase } from "@/use-cases/factories/make-change-password-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // frontend envia token, code e password
    const changePasswordBodySchema = z.object({
      code: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const changePasswordUseCase = makeChangePasswordUseCase();

    const { code, email, password } = changePasswordBodySchema.parse(req.body);
    const original_code = req.body.original_code;

    await changePasswordUseCase.execute({
      email,
      password,
      code,
      original_code,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
