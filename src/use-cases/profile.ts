import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { InvalidUserError } from "@/use-cases/errors/invalid-user-error";
import { User } from "@prisma/client";

interface ProfileUseCaseRequest {
  user_id: string;
}

interface ProfileUseCaseResponse {
  user: User;
}

export class ProfileUseCase {
  private usersRepository: UsersRepositoryInterface;
  constructor(usersRepository: UsersRepositoryInterface) {
    this.usersRepository = usersRepository;
  }

  async execute({
    user_id,
  }: ProfileUseCaseRequest): Promise<ProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new InvalidUserError();
    }

    return {
      user,
    };
  }
}
