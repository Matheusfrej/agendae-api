import { resend } from "@/email/client";
import { getParsedBody } from "@/email/parser";
import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { generateChangePasswordToken } from "@/utils/generate-reset-password-token";
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

    // const changePasswordUseCase = makeChangePasswordUseCase();

    const { email } = sendResetPasswordLinkParamsSchema.parse(req.params);

    const jwtWithEmail = generateChangePasswordToken(email);

    const emailType: EmailType = {
      type: "RESET_PASSWORD",
      params: {
        APP_URL: "www.google.com",
        USER_EMAIL: email,
      },
    };

    const html = getParsedBody(emailType);

    await resend.emails.send({
      from: "Suporte do Agendaê <suporte@agendae.fun>",
      to: [email],
      subject: "Recuperar senha",
      html,
    });
    return res.status(200).send();
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
