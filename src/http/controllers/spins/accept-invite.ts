import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeAcceptInviteUseCase } from "@/use-cases/factories/make-accept-invite-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function acceptInvite(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const acceptSpinParamsSchema = z.object({
      spin_id: z.string(),
    });

    const acceptInviteUseCase = makeAcceptInviteUseCase();

    const { user_id } = req.body.user_id;

    const { spin_id } = acceptSpinParamsSchema.parse(req.params);

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
