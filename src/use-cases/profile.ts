import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { User } from "@prisma/client";
import { UserNotFoundError } from "./errors/user-not-found-error";

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
      throw new UserNotFoundError();
    }

    return {
      user,
    };
  }
}
