import { AlreadyBlockError } from "@/use-cases/errors/already-block-error";
import { AlreadyBlockedError } from "@/use-cases/errors/already-blocked-error";
import { BlockYourselfError } from "@/use-cases/errors/block-yourself-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeBlockUseCase } from "@/use-cases/factories/make-block-use-case";
import { NextFunction, Request, Response } from "express";

export async function block(req: Request, res: Response, next: NextFunction) {
  try {
    const blockUseCase = makeBlockUseCase();

    const { user_id } = req.body.user_id;

    const { another_id } = req.body;

    await blockUseCase.execute({
      user_id,
      another_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(401).send({ message: err.message });
    }
    if (
      err instanceof AlreadyBlockError ||
      err instanceof AlreadyBlockedError ||
      err instanceof BlockYourselfError
    ) {
      return res.status(409).send({ message: err.message });
    }

    return next(err);
  }
}
