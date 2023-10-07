import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { User } from "@prisma/client";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface EditProfileUseCaseRequest {
  user_id: string;
  name?: string;
  profile_pic?: string;
  nickname?: string;
}

interface EditProfileUseCaseResponse {
  user: User;
}

export class EditProfileUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    user_id,
    name,
    profile_pic,
    nickname,
  }: EditProfileUseCaseRequest): Promise<EditProfileUseCaseResponse> {
    const user = await this.usersRepository.findByIdAndUpdate(user_id, {
      name,
      profile_pic,
      nickname,
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      user,
    };
  }
}
