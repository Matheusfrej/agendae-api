import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface GetUserIdByEmailUseCaseRequest {
  email: string;
}

interface GetUserIdByEmailUseCaseResponse {
  user_id: string;
}

export class GetUserIdByEmailUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
  }: GetUserIdByEmailUseCaseRequest): Promise<GetUserIdByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      user_id: user.id,
    };
  }
}
