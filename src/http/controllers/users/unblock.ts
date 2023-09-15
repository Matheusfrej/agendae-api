import { AlreadyUnblockedError } from "@/use-cases/errors/already-unblocked-error";
import { BlockedError } from "@/use-cases/errors/blocked-error";
import { UnblockYourselfError } from "@/use-cases/errors/unblock-yourself-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeUnblockUseCase } from "@/use-cases/factories/make-unblock-use-case";
import { NextFunction, Request, Response } from "express";

export async function unblock(req: Request, res: Response, next: NextFunction) {
  try {
    const unblockUseCase = makeUnblockUseCase();

    const { user_id } = req.body.user_id;

    const { another_id } = req.body;

    await unblockUseCase.execute({
      user_id,
      another_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(401).send({ message: err.message });
    }
    if (
      err instanceof UserNotFoundError ||
      err instanceof AlreadyUnblockedError ||
      err instanceof BlockedError ||
      err instanceof UnblockYourselfError
    ) {
      return res.status(409).send({ message: err.message });
    }

    return next(err);
  }
}
