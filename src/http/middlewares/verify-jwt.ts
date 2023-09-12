import { env } from "@/env";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = req.headers.authorization!;
    const user_id = jwt.verify(token, env.JWT_SECRET);
    req.body.user_id = user_id;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Não autorizado." });
  }
}
