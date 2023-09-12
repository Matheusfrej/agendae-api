import { z } from "zod";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { InvalidUserError } from "@/use-cases/errors/invalid-user-error";
import { makeLoginUseCase } from "@/use-cases/factories/make-login-use-case";
import { env } from "@/env";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const loginBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = loginBodySchema.parse(req.body);

    const loginUseCase = makeLoginUseCase();

    const { user } = await loginUseCase.execute({
      email,
      password,
    });

    const token = jwt.sign({ user_id: user.id }, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).send({ token });
  } catch (err) {
    if (err instanceof InvalidUserError) {
      return res.status(401).send({ message: err.message });
    }

    return next(err);
  }
}
