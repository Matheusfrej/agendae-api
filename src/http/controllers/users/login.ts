import { z } from "zod";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { makeLoginUseCase } from "@/use-cases/factories/make-login-use-case";
import { env } from "@/env";
import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";

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
      expiresIn: "10m",
    });

    const refreshToken = jwt.sign({ user_id: user.id }, env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .cookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
