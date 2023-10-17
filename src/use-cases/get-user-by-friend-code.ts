import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { User } from "@prisma/client";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface GetUserByFriendCodeUseCaseRequest {
  friend_code: string;
}

interface GetUserByFriendCodeUseCaseResponse {
  user: User;
}

export class GetUserByFriendCodeUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    friend_code,
  }: GetUserByFriendCodeUseCaseRequest): Promise<GetUserByFriendCodeUseCaseResponse> {
    const user = await this.usersRepository.findByFriendCode(friend_code);

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      user,
    };
  }
}
