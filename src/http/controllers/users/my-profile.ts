import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeProfileUseCase } from "@/use-cases/factories/make-profile-use-case";
import { NextFunction, Request, Response } from "express";

export async function myProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const profileUseCase = makeProfileUseCase();

    const { user_id } = req.body.user_id;

    const { user, statistics } = await profileUseCase.execute({
      user_id,
    });

    return res
      .status(200)
      .send({ user: { ...user, password: undefined }, statistics });
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(401).send({ message: err.message });
    }

    return next(err);
  }
}
