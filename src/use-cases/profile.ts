import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { User } from "@prisma/client";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { ParticipateSpinRepositoryInterface } from "@/repositories/participate-spin-repository-interface";
import { FriendshipRepositoryInterface } from "@/repositories/friendship-repository-interface";
import { BlockRepositoryInterface } from "@/repositories/block-repository-interface";
import { ReportRepositoryInterface } from "@/repositories/report-repository-interface";

interface ProfileUseCaseRequest {
  my_id: string;
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
  is_friend?: boolean;
  is_blocked?: boolean;
  is_reported?: boolean;
}

export class ProfileUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private friendshipRepository: FriendshipRepositoryInterface,
    private blockRepository: BlockRepositoryInterface,
    private spinsRepository: SpinRepositoryInterface,
    private participateSpinsRepository: ParticipateSpinRepositoryInterface,
    private reportRepository: ReportRepositoryInterface,
  ) {}

  async execute({
    my_id,
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

    const friendship = await this.friendshipRepository.getFriendship(
      my_id,
      user_id,
    );

    if (user_id === my_id) {
      return {
        user,
        statistics: userStatistics,
      };
    }

    const is_friend = friendship !== null && friendship.status === 1;

    const is_blocked = await this.blockRepository.didYouBlock(my_id, user_id);

    const is_reported = await this.reportRepository.didYouReport(
      my_id,
      user_id,
    );

    return {
      user,
      statistics: userStatistics,
      is_friend,
      is_blocked,
      is_reported,
    };
  }
}
