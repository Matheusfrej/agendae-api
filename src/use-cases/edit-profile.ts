import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { InvalidUserError } from "@/use-cases/errors/invalid-user-error";
import { User } from "@prisma/client";

interface EditProfileUseCaseRequest {
  user_id: string;
  name: string;
}

interface EditProfileUseCaseResponse {
  user: User;
}

export class EditProfileUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    user_id,
    name,
  }: EditProfileUseCaseRequest): Promise<EditProfileUseCaseResponse> {
    const user = await this.usersRepository.findByIdAndUpdate(user_id, name);

    if (!user) {
      throw new InvalidUserError();
    }

    return {
      user,
    };
  }
}
