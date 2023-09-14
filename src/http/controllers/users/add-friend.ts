import { AddFriendBlockError } from "@/use-cases/errors/add-friend-block-error";
import { AddFriendBlockedError } from "@/use-cases/errors/add-friend-blocked-error";
import { AddYourselfError } from "@/use-cases/errors/add-yourself-error";
import { AlreadyFriendError } from "@/use-cases/errors/already-friend-error";
import { AlreadySentFriendInviteError } from "@/use-cases/errors/already-sent-friend-invite-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeAddFriendUseCase } from "@/use-cases/factories/make-add-friend-use-case";
import { NextFunction, Request, Response } from "express";

export async function addFriend(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const addFriendUseCase = makeAddFriendUseCase();

    const { user_id } = req.body.user_id;

    const { friend_id } = req.body;

    await addFriendUseCase.execute({
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
      err instanceof AlreadySentFriendInviteError ||
      err instanceof AddFriendBlockError ||
      err instanceof AddFriendBlockedError
    ) {
      return res.status(409).send({ message: err.message });
    }

    return next(err);
  }
}
