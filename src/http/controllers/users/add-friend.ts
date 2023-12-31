import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeAddFriendUseCase } from "@/use-cases/factories/make-add-friend-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function addFriend(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const addFriendParamsSchema = z.object({
      friend_id: z.string(),
    });

    const addFriendUseCase = makeAddFriendUseCase();

    const { user_id } = req.body.user_id;

    const { friend_id } = addFriendParamsSchema.parse(req.params);

    await addFriendUseCase.execute({
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
