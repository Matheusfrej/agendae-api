import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeBlockUseCase } from "@/use-cases/factories/make-block-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function block(req: Request, res: Response, next: NextFunction) {
  try {
    const blockParamsSchema = z.object({
      another_id: z.string(),
    });

    const blockUseCase = makeBlockUseCase();

    const { user_id } = req.body.user_id;

    const { another_id } = blockParamsSchema.parse(req.params);

    await blockUseCase.execute({
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
