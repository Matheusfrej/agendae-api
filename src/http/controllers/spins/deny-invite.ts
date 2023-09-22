import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeDenyInviteUseCase } from "@/use-cases/factories/make-deny-invite-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function denyInvite(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const denySpinParamsSchema = z.object({
      spin_id: z.string(),
    });

    const denyInviteUseCase = makeDenyInviteUseCase();

    const { user_id } = req.body.user_id;

    const { spin_id } = denySpinParamsSchema.parse(req.params);

    await denyInviteUseCase.execute({
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
