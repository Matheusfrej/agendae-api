import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { env } from "@/env";
import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";

interface RefreshToken {
  user_id: string;
  iat: number;
  exp: number;
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [, currRefreshToken] = req.headers.cookie!.split("=");

    const user_id = jwt.verify(
      currRefreshToken,
      env.JWT_SECRET,
    ) as RefreshToken;

    const token = jwt.sign({ user_id: user_id.user_id }, env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(
      { user_id: user_id.user_id },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

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
