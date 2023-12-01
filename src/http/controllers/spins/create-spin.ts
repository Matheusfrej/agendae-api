import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
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
      title: z.string().min(1).max(60),
      theme_color: z
        .enum(["purple", "green", "red", "yellow", "cyan", "blue"])
        .default("purple"),
      description: z.string().max(600).optional(),
      place: z.string().max(100).optional(),
      start_date: z.coerce.date().optional(),
      has_start_time: z.coerce.boolean(),
      end_date: z.coerce.date().optional(),
      has_end_time: z.coerce.boolean(),
      participants: z.array(z.string()),
    });

    const spinUseCase = makeCreateSpinUseCase();

    const { user_id } = req.body.user_id;

    const {
      title,
      theme_color,
      description,
      place,
      start_date,
      has_start_time,
      end_date,
      has_end_time,
      participants,
    } = spinBodySchema.parse(req.body);

    const { spin, organizer } = await spinUseCase.execute({
      title,
      organizer_id: user_id,
      theme_color,
      description,
      place,
      start_date,
      has_start_time,
      end_date,
      has_end_time,
      participants,
    });

    const response = {
      ...spin,
      organizer_id: undefined,
      organizer: { ...organizer, password: undefined },
    };

    return res.status(201).send({ spin: response });
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
