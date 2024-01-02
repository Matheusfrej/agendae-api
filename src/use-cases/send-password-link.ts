import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { EmailNotFoundError } from "./errors/email-not-found";
import { generateChangePasswordToken } from "@/utils/generators/generate-reset-password-token";
import { getParsedBody } from "@/email/parser";
import { resend } from "@/email/client";

interface SendPasswordLinkUseCaseRequest {
  email: string;
}

export class SendPasswordLinkUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ email }: SendPasswordLinkUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new EmailNotFoundError();
    }

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
  }
}
