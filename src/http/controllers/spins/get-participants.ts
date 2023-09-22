import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeGetParticipantsUseCase } from "@/use-cases/factories/make-get-participants-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function getParticipants(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const getParticipantsParamsSchema = z.object({
      spin_id: z.string(),
    });

    const getParticipantsUseCase = makeGetParticipantsUseCase();

    const { spin_id } = getParticipantsParamsSchema.parse(req.params);

    const participants = await getParticipantsUseCase.execute({
      spin_id,
    });

    return res.status(200).send(participants);
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
