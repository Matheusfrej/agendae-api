import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { InvalidUserError } from "@/use-cases/errors/invalid-user-error";

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
      throw new InvalidUserError();
    }

    return {
      user_id: user.id,
    };
  }
}
