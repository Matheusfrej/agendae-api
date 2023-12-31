import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { EmailNotFoundError } from "./errors/email-not-found";

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
  }
}
