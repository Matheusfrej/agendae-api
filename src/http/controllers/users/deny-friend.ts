import { AlreadyFriendError } from "@/use-cases/errors/already-friend-error";
import { DenyFriendError } from "@/use-cases/errors/deny-friend-error";
import { DenyYourselfError } from "@/use-cases/errors/deny-yourself-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
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

    const { friend_id } = req.body;

    await denyFriendUseCase.execute({
      user_id,
      friend_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(401).send({ message: err.message });
    }
    if (
      err instanceof DenyYourselfError ||
      err instanceof AlreadyFriendError ||
      err instanceof DenyFriendError
    ) {
      return res.status(409).send({ message: err.message });
    }

    return next(err);
  }
}
