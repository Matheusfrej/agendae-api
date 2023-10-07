import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const registerBodySchema = z.object({
      name: z.string().min(1).max(100),
      nickname: z.string().min(1).max(100).optional(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, nickname, email, password } = registerBodySchema.parse(
      req.body,
    );

    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      nickname,
      email,
      password,
    });

    return res.status(201).send();
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
