import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { Spin, User } from "@prisma/client";
import { EndDateError } from "./errors/end-date-error";
import { SpinNotFoundError } from "./errors/spin-not-found-error";
import { AccessDeniedError } from "./errors/access-denied-error";
import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { BlockRepositoryInterface } from "@/repositories/block-repository-interface";

interface EditSpinUseCaseRequest {
  id: string;
  title: string;
  organizer_id: string;
  description?: string;
  place?: string;
  theme_color: string;
  start_date?: Date;
  has_start_time?: boolean;
  end_date?: Date;
  has_end_time?: boolean;
  participants: string[];
}

interface EditSpinUseCaseResponse {
  spin: Spin;
  organizer: User;
}

export class EditSpinUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private spinRepository: SpinRepositoryInterface,
    private blockRepository: BlockRepositoryInterface,
  ) {}

  async execute({
    id,
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
  }: EditSpinUseCaseRequest): Promise<EditSpinUseCaseResponse> {
    if (
      start_date &&
      end_date &&
      end_date.getTime() - start_date.getTime() < 0
    ) {
      throw new EndDateError();
    }

    const spin = await this.spinRepository.findById(id);

    if (!spin) {
      throw new SpinNotFoundError();
    }

    if (spin.organizer_id !== organizer_id) {
      throw new AccessDeniedError();
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

    const newSpin = await this.spinRepository.findByIdAndUpdate(
      id,
      {
        title,
        theme_color,
        description,
        place,
        start_date,
        has_start_time,
        end_date,
        has_end_time,
      },
      filteredIds,
    );

    if (!newSpin) {
      throw new SpinNotFoundError();
    }

    const organizer = await this.usersRepository.findById(newSpin.organizer_id);

    if (!organizer) {
      throw new UserNotFoundError();
    }

    return { spin: newSpin, organizer };
  }
}
