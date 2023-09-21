import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeAcceptInviteUseCase } from "@/use-cases/factories/make-accept-invite-use-case";
import { NextFunction, Request, Response } from "express";

export async function acceptInvite(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const acceptInviteUseCase = makeAcceptInviteUseCase();

    const { user_id } = req.body.user_id;

    const { spin_id } = req.body;

    await acceptInviteUseCase.execute({
      spin_id,
      user_invited_id: user_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
