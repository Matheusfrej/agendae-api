import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(req.body);

    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message });
    }

    return next(err);
  }

  return res.status(201).send();
}
