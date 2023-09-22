import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeInviteSpinUseCase } from "@/use-cases/factories/make-invite-spin-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function inviteSpin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const inviteSpinBodySchema = z.object({
      spin_id: z.string(),
      user_invited_id: z.string(),
    });

    const inviteSpinUseCase = makeInviteSpinUseCase();

    const { user_id } = req.body.user_id;

    const { spin_id, user_invited_id } = inviteSpinBodySchema.parse(req.body);

    const spin = await inviteSpinUseCase.execute({
      organizer_id: user_id,
      spin_id,
      user_invited_id,
    });

    return res.status(200).send(spin);
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
