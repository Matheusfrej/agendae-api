import { ParticipateSpinRepositoryInterface } from "@/repositories/participate-spin-repository-interface";
import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { SpinNotFoundError } from "./errors/spin-not-found-error";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { AccessDeniedError } from "./errors/access-denied-error";
import { UserAlreadyInvitedError } from "./errors/user-already-invited-error";
import { UserAlreadyInSpinError } from "./errors/user-already-in-spin-error";
import { InviteYourselfError } from "./errors/invite-yourself-error";
import { BlockRepositoryInterface } from "@/repositories/block-repository-interface";
import { BlockedError } from "./errors/blocked-error";
import { BlockInviteError } from "./errors/block-invite-error";

interface InviteSpinUseCaseRequest {
  organizer_id: string;
  spin_id: string;
  user_invited_id: string;
}

export class InviteSpinUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private spinRepository: SpinRepositoryInterface,
    private participateSpinRepository: ParticipateSpinRepositoryInterface,
    private blockRepository: BlockRepositoryInterface,
  ) {}

  async execute({
    organizer_id,
    spin_id,
    user_invited_id,
  }: InviteSpinUseCaseRequest) {
    if (organizer_id === user_invited_id) {
      throw new InviteYourselfError();
    }

    const user = await this.usersRepository.findById(user_invited_id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const spin = await this.spinRepository.findById(spin_id);

    if (!spin) {
      throw new SpinNotFoundError();
    }

    if (organizer_id !== spin.organizer_id) {
      throw new AccessDeniedError();
    }

    const invite = await this.participateSpinRepository.getInvite(
      spin_id,
      user_invited_id,
    );

    if (!invite) {
      const didYouBlock = await this.blockRepository.didYouBlock(
        organizer_id,
        user_invited_id,
      );

      if (didYouBlock) {
        throw new BlockInviteError();
      }

      const wereYouBlocked = await this.blockRepository.wereYouBlocked(
        organizer_id,
        user_invited_id,
      );

      if (wereYouBlocked) {
        throw new BlockedError();
      }

      await this.participateSpinRepository.inviteUser(spin_id, user_invited_id);
    } else if (invite.status === 2) {
      await this.participateSpinRepository.inviteUserAgain(invite.id);
    } else if (invite.status === 0) {
      throw new UserAlreadyInvitedError(user.name);
    } else if (invite.status === 1) {
      throw new UserAlreadyInSpinError(user.name);
    }
  }
}
