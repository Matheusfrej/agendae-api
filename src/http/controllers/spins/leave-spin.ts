import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeLeaveSpinUseCase } from "@/use-cases/factories/make-leave-spin-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function leaveSpin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const leaveSpinParamsSchema = z.object({
      spin_id: z.string(),
    });

    const leaveSpinUseCase = makeLeaveSpinUseCase();

    const { user_id } = req.body.user_id;

    const { spin_id } = leaveSpinParamsSchema.parse(req.params);

    await leaveSpinUseCase.execute({
      user_id,
      spin_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
