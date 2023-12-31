import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeDeleteSpinUseCase } from "@/use-cases/factories/make-delete-spin-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function deleteSpin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const deleteSpinParamsSchema = z.object({
      spin_id: z.string(),
    });

    const deleteSpinUseCase = makeDeleteSpinUseCase();

    const { user_id } = req.body.user_id;
    const { spin_id } = deleteSpinParamsSchema.parse(req.params);

    await deleteSpinUseCase.execute({
      spin_id,
      user_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
