import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeProfileUseCase } from "@/use-cases/factories/make-profile-use-case";
import { NextFunction, Request, Response } from "express";

export async function profile(req: Request, res: Response, next: NextFunction) {
  try {
    const profileUseCase = makeProfileUseCase();

    const { id } = req.params;
    const { user_id } = req.body.user_id;

    const { user, statistics, is_friend, is_blocked, is_reported } =
      await profileUseCase.execute({
        my_id: user_id,
        user_id: id,
      });

    return res.status(200).send({
      user: { ...user, password: undefined },
      is_friend,
      is_blocked,
      is_reported,
      statistics,
    });
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(401).send({ message: err.message });
    }

    return next(err);
  }
}
