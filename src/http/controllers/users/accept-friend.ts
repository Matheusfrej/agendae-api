import { AcceptFriendError } from "@/use-cases/errors/accept-friend-error";
import { AddYourselfError } from "@/use-cases/errors/add-yourself-error";
import { AlreadyFriendError } from "@/use-cases/errors/already-friend-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeAcceptFriendUseCase } from "@/use-cases/factories/make-accept-friend-use-case";
import { NextFunction, Request, Response } from "express";

export async function acceptFriend(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const acceptFriendUseCase = makeAcceptFriendUseCase();

    const { user_id } = req.body.user_id;

    const { friend_id } = req.body;

    await acceptFriendUseCase.execute({
      user_id,
      friend_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(401).send({ message: err.message });
    }
    if (
      err instanceof AddYourselfError ||
      err instanceof AlreadyFriendError ||
      err instanceof AcceptFriendError
    ) {
      return res.status(409).send({ message: err.message });
    }

    return next(err);
  }
}
