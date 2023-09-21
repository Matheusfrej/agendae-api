import { ParticipateSpinRepositoryInterface } from "@/repositories/participate-spin-repository-interface";
import { UserNotInvitedError } from "./errors/user-not-invited-error";
import { UserAlreadyInvitedError } from "./errors/user-already-invited-error";
import { UserAlreadyDeniedInviteError } from "./errors/user-already-denied-invite-error";
import { BlockRepositoryInterface } from "@/repositories/block-repository-interface";
import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { SpinNotFoundError } from "./errors/spin-not-found-error";
import { BlockError } from "./errors/block-error";

interface DenyInviteUseCaseRequest {
  spin_id: string;
  user_invited_id: string;
}

export class DenyInviteUseCase {
  constructor(
    private participateSpinRepository: ParticipateSpinRepositoryInterface,
    private spinRepository: SpinRepositoryInterface,
    private blockRepository: BlockRepositoryInterface,
  ) {}

  async execute({ spin_id, user_invited_id }: DenyInviteUseCaseRequest) {
    const invite = await this.participateSpinRepository.getInvite(
      spin_id,
      user_invited_id,
    );

    console.log(invite);

    if (!invite) {
      throw new UserNotInvitedError();
    } else if (invite.status === 1) {
      throw new UserAlreadyInvitedError("Você");
    } else if (invite.status === 2) {
      throw new UserAlreadyDeniedInviteError();
    }

    const spin = await this.spinRepository.findById(spin_id);

    if (!spin) {
      throw new SpinNotFoundError();
    }

    const isThereBlock = await this.blockRepository.isThereBlock(
      spin.organizer_id,
      user_invited_id,
    );

    if (isThereBlock) {
      await this.participateSpinRepository.removeInvite(invite.id);

      throw new BlockError();
    }

    await this.participateSpinRepository.denyInvite(invite.id);
  }
}
