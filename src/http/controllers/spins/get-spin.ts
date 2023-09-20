import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeGetSpinUseCase } from "@/use-cases/factories/make-get-spin-use-case";
import { NextFunction, Request, Response } from "express";

export async function getSpin(req: Request, res: Response, next: NextFunction) {
  try {
    const spinUseCase = makeGetSpinUseCase();

    const { id } = req.params;

    const { spin, organizer } = await spinUseCase.execute({
      spin_id: id,
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
