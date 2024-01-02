import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { EmailNotFoundError } from "./errors/email-not-found";
import { generateChangePasswordToken } from "@/utils/generators/generate-reset-password-token";
import { getParsedBody } from "@/email/parser";
import { resend } from "@/email/client";
import { generateResetPasswordCode } from "../utils/generators/generate-reset-password-code";

interface SendPasswordLinkUseCaseRequest {
  email: string;
}

interface SendPasswordLinkUseCaseResponse {
  token: string;
}

export class SendPasswordLinkUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
  }: SendPasswordLinkUseCaseRequest): Promise<SendPasswordLinkUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new EmailNotFoundError();
    }

    const resetPasswordCode = generateResetPasswordCode();

    console.log(resetPasswordCode);

    const jwtWithEmailAndCode = generateChangePasswordToken(
      email,
      resetPasswordCode,
    );

    const emailType: EmailType = {
      type: "RESET_PASSWORD",
      params: {
        RESET_PASSWORD_CODE: resetPasswordCode,
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

    return { token: jwtWithEmailAndCode };
  }
}
