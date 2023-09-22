import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeRemoveFriendUseCase } from "@/use-cases/factories/make-remove-friend-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function removeFriend(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const removeFriendParamsSchema = z.object({
      friend_id: z.string(),
    });

    const removeFriendUseCase = makeRemoveFriendUseCase();

    const { user_id } = req.body.user_id;

    const { friend_id } = removeFriendParamsSchema.parse(req.params);

    await removeFriendUseCase.execute({
      user_id,
      friend_id,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
