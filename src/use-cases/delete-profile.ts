import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface DeleteProfileUseCaseRequest {
  user_id: string;
}

export class DeleteProfileUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ user_id }: DeleteProfileUseCaseRequest) {
    const user = await this.usersRepository.findByIdAndDelete(user_id);

    if (!user) {
      throw new UserNotFoundError();
    }
  }
}
