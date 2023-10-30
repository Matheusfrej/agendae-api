import { env } from "@/env";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface ChangePasswordToken {
  email: string;
  iat: number;
  exp: number;
}

export async function verifyChangePasswordJWT(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.body.email;
    console.log(token);

    const { email } = jwt.verify(token, env.JWT_SECRET) as ChangePasswordToken;

    req.body.email = email;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Não autorizado." });
  }
}
