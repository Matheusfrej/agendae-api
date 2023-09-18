import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { Spin } from "@prisma/client";
import { CreateSpinError } from "./errors/create-spin-error";
import { EndDateError } from "./errors/end-date-error";

interface CreateSpinUseCaseRequest {
  title: string;
  organizer_id: string;
  description?: string;
  place?: string;
  theme_color: string;
  start_date?: Date;
  end_date?: Date;
}

interface CreateSpinUseCaseResponse {
  spin: Spin;
}

export class CreateSpinUseCase {
  constructor(private spinRepository: SpinRepositoryInterface) {}

  async execute({
    title,
    organizer_id,
    description,
    place,
    theme_color,
    start_date,
    end_date,
  }: CreateSpinUseCaseRequest): Promise<CreateSpinUseCaseResponse> {
    if (
      start_date &&
      end_date &&
      end_date.getTime() - start_date.getTime() < 0
    ) {
      throw new EndDateError();
    }

    const spin = await this.spinRepository.createSpin({
      title,
      theme_color,
      organizer_id,
      description,
      place,
      start_date,
      end_date,
    });

    if (!spin) {
      throw new CreateSpinError();
    }

    return { spin };
  }
}
