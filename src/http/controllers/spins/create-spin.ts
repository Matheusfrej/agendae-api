import { CreateSpinError } from "@/use-cases/errors/create-spin-error";
import { EndDateError } from "@/use-cases/errors/end-date-error";
import { makeCreateSpinUseCase } from "@/use-cases/factories/make-create-spin-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function createSpin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const spinBodySchema = z.object({
      title: z.string().max(60),
      theme_color: z
        .enum(["purple", "green", "red", "yellow", "cyan", "blue"])
        .default("purple"),
      description: z.string().max(600).optional(),
      place: z.string().max(100).optional(),
      start_date: z.coerce.date().optional(),
      end_date: z.coerce.date().optional(),
    });

    const spinUseCase = makeCreateSpinUseCase();

    const { user_id } = req.body.user_id;

    const { title, theme_color, description, place, start_date, end_date } =
      spinBodySchema.parse(req.body);

    const spin = await spinUseCase.execute({
      title,
      organizer_id: user_id,
      theme_color,
      description,
      place,
      start_date,
      end_date,
    });

    return res.status(201).send(spin);
  } catch (err) {
    if (err instanceof CreateSpinError || err instanceof EndDateError) {
      return res.status(400).send({ message: err.message });
    }

    return next(err);
  }
}
