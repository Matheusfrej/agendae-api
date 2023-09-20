import { Spin, User } from "@prisma/client";
import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { SpinNotFoundError } from "./errors/spin-not-found-error";
import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface GetSpinUseCaseRequest {
  spin_id: string;
}

interface GetSpinUseCaseResponse {
  spin: Spin;
  organizer: User;
}

export class GetSpinUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private spinRepository: SpinRepositoryInterface,
  ) {}

  async execute({
    spin_id,
  }: GetSpinUseCaseRequest): Promise<GetSpinUseCaseResponse> {
    const spin = await this.spinRepository.findById(spin_id);

    if (!spin) {
      throw new SpinNotFoundError();
    }

    const organizer = await this.usersRepository.findById(spin.organizer_id);

    if (!organizer) {
      throw new UserNotFoundError();
    }

    return { spin, organizer };
  }
}
