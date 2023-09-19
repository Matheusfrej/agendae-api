import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { Spin } from "@prisma/client";
import { EndDateError } from "./errors/end-date-error";
import { SpinNotFoundError } from "./errors/spin-not-found-error";
import { AccessDeniedError } from "./errors/access-denied-error";

interface EditSpinUseCaseRequest {
  id: string;
  title: string;
  organizer_id: string;
  description?: string;
  place?: string;
  theme_color: string;
  start_date?: Date;
  end_date?: Date;
}

interface EditSpinUseCaseResponse {
  spin: Spin;
}

export class EditSpinUseCase {
  constructor(private spinRepository: SpinRepositoryInterface) {}

  async execute({
    id,
    title,
    organizer_id,
    description,
    place,
    theme_color,
    start_date,
    end_date,
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

    const newSpin = await this.spinRepository.findByIdAndUpdate(id, {
      title,
      theme_color,
      description,
      place,
      start_date,
      end_date,
    });

    if (!newSpin) {
      throw new SpinNotFoundError();
    }

    return { spin: newSpin };
  }
}
