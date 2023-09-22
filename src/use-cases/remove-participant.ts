import { UserNotFoundError } from "./errors/user-not-found-error";
import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { ParticipateSpinRepositoryInterface } from "@/repositories/participate-spin-repository-interface";
import { SpinNotFoundError } from "./errors/spin-not-found-error";
import { RemoveYourselfError } from "./errors/remove-yourself-error";
import { UserNotInSpinError } from "./errors/user-not-in-spin-error";

interface RemoveParticipantUseCaseRequest {
  user_id: string;
  spin_id: string;
  another_id: string;
}

export class RemoveParticipantUseCase {
  constructor(
    private spinRepository: SpinRepositoryInterface,
    private participateSpinRepository: ParticipateSpinRepositoryInterface,
  ) {}

  async execute({
    user_id,
    spin_id,
    another_id,
  }: RemoveParticipantUseCaseRequest) {
    const spin = await this.spinRepository.findById(spin_id);

    if (!spin) {
      throw new SpinNotFoundError();
    }

    if (user_id === another_id) {
      throw new RemoveYourselfError();
    }

    const participateSpin = await this.participateSpinRepository.getInvite(
      spin_id,
      another_id,
    );

    if (!participateSpin) {
      throw new UserNotInSpinError();
    }

    await this.participateSpinRepository.removeInvite(participateSpin.id);
  }
}
