import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { hash } from "bcryptjs";
import { SALT_LENGTH } from "../utils/constants/number";
import { WrongCodeError } from "./errors/wrong-code-error";

interface ChangePasswordUseCaseRequest {
  email: string;
  password: string;
  code: string;
  original_code: string;
}

export class ChangePasswordUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    password,
    code,
    original_code,
  }: ChangePasswordUseCaseRequest) {
    const password_hash = await hash(password, SALT_LENGTH);
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (code !== original_code) {
      throw new WrongCodeError();
    }

    await this.usersRepository.findByIdAndUpdatePassword(
      user.id,
      password_hash,
    );
  }
}
