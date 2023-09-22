import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeGetSpinUseCase } from "@/use-cases/factories/make-get-spin-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function getSpin(req: Request, res: Response, next: NextFunction) {
  try {
    const getSpinParamsSchema = z.object({
      spin_id: z.string(),
    });

    const spinUseCase = makeGetSpinUseCase();

    const { spin_id } = getSpinParamsSchema.parse(req.params);

    const { spin, organizer } = await spinUseCase.execute({
      spin_id,
    });

    const response = {
      ...spin,
      organizer_id: undefined,
      organizer: { ...organizer, password: undefined },
    };

    return res.status(200).send(response);
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
