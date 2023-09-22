import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { ParticipateSpinRepositoryInterface } from "@/repositories/participate-spin-repository-interface";
import { SpinNotFoundError } from "./errors/spin-not-found-error";
import { UserNotInSpinError } from "./errors/user-not-in-spin-error";
import { OrganizerLeaveSpinError } from "./errors/organizer-leave-spin-error";

interface LeaveSpinUseCaseRequest {
  user_id: string;
  spin_id: string;
}

export class LeaveSpinUseCase {
  constructor(
    private spinRepository: SpinRepositoryInterface,
    private participateSpinRepository: ParticipateSpinRepositoryInterface,
  ) {}

  async execute({ user_id, spin_id }: LeaveSpinUseCaseRequest) {
    const spin = await this.spinRepository.findById(spin_id);

    if (!spin) {
      throw new SpinNotFoundError();
    }

    if (user_id === spin.organizer_id) {
      throw new OrganizerLeaveSpinError();
    }

    const participateSpin = await this.participateSpinRepository.getInvite(
      spin_id,
      user_id,
    );

    if (
      !participateSpin ||
      participateSpin.status === 0 ||
      participateSpin.status === 2
    ) {
      throw new UserNotInSpinError("Você");
    }

    await this.participateSpinRepository.removeInvite(participateSpin.id);
  }
}
