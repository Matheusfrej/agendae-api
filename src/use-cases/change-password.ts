import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { hash } from "bcryptjs";

interface ChangePasswordUseCaseRequest {
  email: string;
  password: string;
}

export class ChangePasswordUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ email, password }: ChangePasswordUseCaseRequest) {
    const password_hash = await hash(password, 6);
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.usersRepository.findByIdAndUpdatePassword(
      user.id,
      password_hash,
    );
  }
}
