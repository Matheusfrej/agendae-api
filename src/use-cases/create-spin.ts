import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { Spin } from "@prisma/client";
import { CreateSpinError } from "./errors/create-spin-error";
import { EndDateError } from "./errors/end-date-error";
import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { User } from "@sentry/node";
import { BlockRepositoryInterface } from "@/repositories/block-repository-interface";

interface CreateSpinUseCaseRequest {
  title: string;
  organizer_id: string;
  description?: string;
  place?: string;
  theme_color: string;
  start_date?: Date;
  has_start_time: boolean;
  end_date?: Date;
  has_end_time: boolean;
  participants: string[];
}

interface CreateSpinUseCaseResponse {
  spin: Spin;
  organizer: User;
}

export class CreateSpinUseCase {
  constructor(
    private spinRepository: SpinRepositoryInterface,
    private usersRepository: UsersRepositoryInterface,
    private blockRepository: BlockRepositoryInterface,
  ) {}

  async execute({
    title,
    organizer_id,
    description,
    place,
    theme_color,
    start_date,
    has_start_time,
    end_date,
    has_end_time,
    participants,
  }: CreateSpinUseCaseRequest): Promise<CreateSpinUseCaseResponse> {
    if (
      start_date &&
      end_date &&
      end_date.getTime() - start_date.getTime() < 0
    ) {
      throw new EndDateError();
    }

    // Não pode se convidar
    participants = participants.filter((id) => id !== organizer_id);

    // não pode convidar quem te bloqueou nem que não existe
    const participantsFiltered = await Promise.all(
      participants.map(async (id) => {
        const exists = await this.usersRepository.findById(id);
        const userExists = !!exists;
        if (userExists) {
          const isBlocked = await this.blockRepository.wereYouBlocked(
            organizer_id,
            id,
          );

          return { id, isBlocked, userExists };
        }
        return { id, isBlocked: true, userExists };
      }),
    );

    const filteredIds = participantsFiltered
      .filter((item) => !item.isBlocked)
      .filter((item) => item.userExists)
      .map((item) => item.id);

    const spin = await this.spinRepository.createSpin(
      {
        title,
        theme_color,
        organizer_id,
        description,
        place,
        start_date,
        has_start_time,
        end_date,
        has_end_time,
      },
      filteredIds,
    );

    if (!spin) {
      throw new CreateSpinError();
    }

    const organizer = await this.usersRepository.findById(spin.organizer_id);

    if (!organizer) {
      throw new UserNotFoundError();
    }

    return { spin, organizer };
  }
}
