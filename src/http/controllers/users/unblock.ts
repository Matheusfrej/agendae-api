import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeUnblockUseCase } from "@/use-cases/factories/make-unblock-use-case";
import { NextFunction, Request, Response } from "express";

export async function unblock(req: Request, res: Response, next: NextFunction) {
  try {
    const unblockUseCase = makeUnblockUseCase();

    const { user_id } = req.body.user_id;

    const { another_id } = req.params;

    await unblockUseCase.execute({
      user_id,
      another_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
