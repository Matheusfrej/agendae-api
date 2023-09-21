import { ParticipateSpinRepositoryInterface } from "@/repositories/participate-spin-repository-interface";
import { UserNotInvitedError } from "./errors/user-not-invited-error";
import { UserAlreadyInvitedError } from "./errors/user-already-invited-error";
import { UserAlreadyDeniedInviteError } from "./errors/user-already-denied-invite-error";

interface AcceptInviteUseCaseRequest {
  spin_id: string;
  user_invited_id: string;
}

export class AcceptInviteUseCase {
  constructor(
    private participateSpinRepository: ParticipateSpinRepositoryInterface,
  ) {}

  async execute({ spin_id, user_invited_id }: AcceptInviteUseCaseRequest) {
    const invite = await this.participateSpinRepository.getInvite(
      spin_id,
      user_invited_id,
    );

    if (!invite) {
      throw new UserNotInvitedError();
    } else if (invite.status === 1) {
      throw new UserAlreadyInvitedError("Você");
    } else if (invite.status === 2) {
      throw new UserAlreadyDeniedInviteError();
    }

    await this.participateSpinRepository.acceptInvite(invite.id);
  }
}
