import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeDeleteProfileUseCase } from "@/use-cases/factories/make-delete-profile-use-case";
import { NextFunction, Request, Response } from "express";

export async function deleteProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const deleteProfileUseCase = makeDeleteProfileUseCase();

    const { user_id } = req.body.user_id;

    await deleteProfileUseCase.execute({
      user_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(401).send({ message: err.message });
    }

    return next(err);
  }
}
