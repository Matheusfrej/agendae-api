import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeRemoveParticipantUseCase } from "@/use-cases/factories/make-remove-participant-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function removeParticipant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const removeParticipantBodySchema = z.object({
      spin_id: z.string(),
    });

    const removeParticipantParamsSchema = z.object({
      another_id: z.string(),
    });

    const removeParticipantUseCase = makeRemoveParticipantUseCase();

    const { user_id } = req.body.user_id;
    const { another_id } = removeParticipantParamsSchema.parse(req.params);

    const { spin_id } = removeParticipantBodySchema.parse(req.body);

    await removeParticipantUseCase.execute({
      user_id,
      spin_id,
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
