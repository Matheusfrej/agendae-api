import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeGetUserByFriendCodeUseCase } from "@/use-cases/factories/make-get-user-by-friend-code-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function getUserByFriendCode(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const getUserByFriendCodeParamsSchema = z.object({
      friend_code: z.string(),
    });

    const getUserIdUseCase = makeGetUserByFriendCodeUseCase();

    const { friend_code } = getUserByFriendCodeParamsSchema.parse(req.params);

    const { user } = await getUserIdUseCase.execute({
      friend_code,
    });

    return res.status(200).send({ user: { ...user, password: undefined } });
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
