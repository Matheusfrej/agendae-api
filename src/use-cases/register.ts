import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { generateFriendCode } from "@/utils/generate-friend-code";
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

    let friendCode = generateFriendCode();
    let userWithSameFriendCode =
      await this.usersRepository.findByFriendCode(friendCode);
    while (userWithSameFriendCode !== null) {
      friendCode = generateFriendCode();
      userWithSameFriendCode =
        await this.usersRepository.findByFriendCode(friendCode);
    }

    const user = await this.usersRepository.create({
      name,
      nickname,
      email,
      password: password_hash,
      friend_code: friendCode,
    });

    return {
      user,
    };
  }
}
