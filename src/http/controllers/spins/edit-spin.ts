import { AccessDeniedError } from "@/use-cases/errors/access-denied-error";
import { EndDateError } from "@/use-cases/errors/end-date-error";
import { SpinNotFoundError } from "@/use-cases/errors/spin-not-found-error";
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

    const spinUseCase = makeEditSpinUseCase();

    const { user_id } = req.body.user_id;
    const { id } = req.params;

    const { title, theme_color, description, place, start_date, end_date } =
      editSpinBodySchema.parse(req.body);

    const spin = await spinUseCase.execute({
      id,
      title,
      organizer_id: user_id,
      theme_color,
      description,
      place,
      start_date,
      end_date,
    });

    return res.status(200).send(spin);
  } catch (err) {
    if (err instanceof SpinNotFoundError || err instanceof AccessDeniedError) {
      return res.status(404).send({ message: err.message });
    } else if (err instanceof EndDateError) {
      return res.status(401).send({ message: err.message });
    }

    return next(err);
  }
}
