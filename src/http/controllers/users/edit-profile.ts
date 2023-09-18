import { InvalidUserError } from "@/use-cases/errors/invalid-user-error";
import { makeEditProfileUseCase } from "@/use-cases/factories/make-edit-profile-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function editProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const editProfileBodySchema = z.object({
      name: z.string().max(100),
    });

    const { name } = editProfileBodySchema.parse(req.body);

    const profileUseCase = makeEditProfileUseCase();

    const { user_id } = req.body.user_id;

    const { user } = await profileUseCase.execute({
      user_id,
      name,
    });

    return res.status(200).send({ user: { ...user, password: undefined } });
  } catch (err) {
    if (err instanceof InvalidUserError) {
      return res.status(401).send({ message: err.message });
    }

    return next(err);
  }
}
