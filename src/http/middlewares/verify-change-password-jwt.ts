import { env } from "@/env";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface ChangePasswordToken {
  email: string;
  code: string;
  iat: number;
  exp: number;
}

export async function verifyChangePasswordJWT(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.body.token;

    const { email, code } = jwt.verify(
      token,
      env.JWT_SECRET,
    ) as ChangePasswordToken;

    req.body.email = email;
    req.body.original_code = code;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Não autorizado." });
  }
}
