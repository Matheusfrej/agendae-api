import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeNotificationsUseCase } from "@/use-cases/factories/make-notifications-use-case";
import { NextFunction, Request, Response } from "express";

export async function notifications(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const notificationsUseCase = makeNotificationsUseCase();

    const { user_id } = req.body.user_id;

    const notifications = await notificationsUseCase.execute({
      user_id,
    });

    return res.status(200).send(notifications);
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
