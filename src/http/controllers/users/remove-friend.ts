import { AlreadyNotFriendError } from "@/use-cases/errors/already-not-friend-error";
import { RemoveFriendshipYourselfError } from "@/use-cases/errors/remove-friendship-yourself-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makerRemoveFriendUseCase } from "@/use-cases/factories/make-remove-friend-use-case";
import { NextFunction, Request, Response } from "express";

export async function removeFriend(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const removeFriendUseCase = makerRemoveFriendUseCase();

    const { user_id } = req.body.user_id;

    const { friend_id } = req.body;

    await removeFriendUseCase.execute({
      user_id,
      friend_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(401).send({ message: err.message });
    }
    if (
      err instanceof RemoveFriendshipYourselfError ||
      err instanceof AlreadyNotFriendError
    ) {
      return res.status(409).send({ message: err.message });
    }

    return next(err);
  }
}
