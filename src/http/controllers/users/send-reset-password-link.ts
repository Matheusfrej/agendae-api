import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeSendPasswordLinkUseCase } from "@/use-cases/factories/make-send-password-link-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function sendResetPasswordLink(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const sendResetPasswordLinkParamsSchema = z.object({
      email: z.string().email(),
    });

    const sendPasswordLinkUseCase = makeSendPasswordLinkUseCase();

    const { email } = sendResetPasswordLinkParamsSchema.parse(req.params);

    const { token } = await sendPasswordLinkUseCase.execute({ email });

    return res.status(200).send({ token });
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
