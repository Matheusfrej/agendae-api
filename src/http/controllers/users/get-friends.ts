import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeGetFriendsUseCase } from "@/use-cases/factories/make-get-friends-use-case";
import { NextFunction, Request, Response } from "express";

export async function getFriends(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const getFriendsUseCase = makeGetFriendsUseCase();

    const { user_id } = req.body.user_id;

    const friends = await getFriendsUseCase.execute({
      user_id,
    });

    const friendsWithoutPassword = friends.friends.map((friend) => {
      return { ...friend, password: undefined };
    });

    return res.status(200).send({ friends: friendsWithoutPassword });
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
