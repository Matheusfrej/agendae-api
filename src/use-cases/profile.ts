import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { User } from "@prisma/client";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { ParticipateSpinRepositoryInterface } from "@/repositories/participate-spin-repository-interface";

interface ProfileUseCaseRequest {
  user_id: string;
}

interface UserStatistics {
  previous_spins: number;
  total_spins: number;
  invited_spins: number;
}

interface ProfileUseCaseResponse {
  user: User;
  statistics: UserStatistics;
}

export class ProfileUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private spinsRepository: SpinRepositoryInterface,
    private participateSpinsRepository: ParticipateSpinRepositoryInterface,
  ) {}

  async execute({
    user_id,
  }: ProfileUseCaseRequest): Promise<ProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const previous_spins =
      await this.spinsRepository.getPastSpinsNumber(user_id);

    const total_spins = await this.spinsRepository.getTotalSpinsNumber(user_id);

    const invited_spins =
      await this.participateSpinsRepository.getParticipateSpinNumber(user_id);

    const userStatistics: UserStatistics = {
      previous_spins: previous_spins === null ? 0 : previous_spins,
      total_spins: total_spins === null ? 0 : total_spins,
      invited_spins: invited_spins === null ? 0 : invited_spins,
    };

    return {
      user,
      statistics: userStatistics,
    };
  }
}
