import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeDenyFriendUseCase } from "@/use-cases/factories/make-deny-friend-use-case";
import { NextFunction, Request, Response } from "express";

export async function denyFriend(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const denyFriendUseCase = makeDenyFriendUseCase();

    const { user_id } = req.body.user_id;

    const { friend_id } = req.params;

    await denyFriendUseCase.execute({
      user_id,
      friend_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
