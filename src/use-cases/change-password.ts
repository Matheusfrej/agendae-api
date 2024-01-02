import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { hash } from "bcryptjs";
import { SALT_LENGTH } from "../utils/constants/number";

interface ChangePasswordUseCaseRequest {
  email: string;
  password: string;
}

export class ChangePasswordUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ email, password }: ChangePasswordUseCaseRequest) {
    const password_hash = await hash(password, SALT_LENGTH);
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
