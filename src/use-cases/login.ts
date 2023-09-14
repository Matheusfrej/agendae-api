import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { InvalidUserError } from "@/use-cases/errors/invalid-user-error";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface LoginUseCaseRequest {
  email: string;
  password: string;
}

interface LoginUseCaseResponse {
  user: User;
}

export class LoginUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    password,
  }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidUserError();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new InvalidUserError();
    }

    return {
      user,
    };
  }
}
