import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeEditSpinUseCase } from "@/use-cases/factories/make-edit-spin-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function editSpin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const editSpinBodySchema = z.object({
      title: z.string().max(60),
      theme_color: z
        .enum(["purple", "green", "red", "yellow", "cyan", "blue"])
        .default("purple"),
      description: z.string().max(600).optional(),
      place: z.string().max(100).optional(),
      start_date: z.coerce.date().optional(),
      end_date: z.coerce.date().optional(),
    });

    const editSpinParamsSchema = z.object({
      spin_id: z.string(),
    });

    const spinUseCase = makeEditSpinUseCase();

    const { user_id } = req.body.user_id;
    const { spin_id } = editSpinParamsSchema.parse(req.params);

    const { title, theme_color, description, place, start_date, end_date } =
      editSpinBodySchema.parse(req.body);

    const { spin, organizer } = await spinUseCase.execute({
      id: spin_id,
      title,
      organizer_id: user_id,
      theme_color,
      description,
      place,
      start_date,
      end_date,
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
