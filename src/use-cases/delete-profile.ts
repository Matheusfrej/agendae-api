import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface DeleteProfileUseCaseRequest {
  user_id: string;
}

export class DeleteProfileUseCase {
  private usersRepository: UsersRepositoryInterface;
  constructor(usersRepository: UsersRepositoryInterface) {
    this.usersRepository = usersRepository;
  }

  async execute({ user_id }: DeleteProfileUseCaseRequest) {
    const user = await this.usersRepository.findByIdAndDelete(user_id);

    if (!user) {
      throw new UserNotFoundError();
    }
  }
}
