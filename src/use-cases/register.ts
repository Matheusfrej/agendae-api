import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  nickname?: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    name,
    nickname,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      nickname,
      email,
      password: password_hash,
    });

    return {
      user,
    };
  }
}
