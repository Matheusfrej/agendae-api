import { getParticipantsType } from "@/@types/prisma-query-types";
import { SpinNotFoundError } from "./errors/spin-not-found-error";
import { ParticipateSpinRepositoryInterface } from "@/repositories/participate-spin-repository-interface";
import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";

interface GetParticipantsUseCaseRequest {
  spin_id: string;
}

interface GetParticipantsUseCaseResponse {
  participants: getParticipantsType[];
}

export class GetParticipantsUseCase {
  constructor(
    private spinRepository: SpinRepositoryInterface,
    private participateSpinRepository: ParticipateSpinRepositoryInterface,
  ) {}

  async execute({
    spin_id,
  }: GetParticipantsUseCaseRequest): Promise<GetParticipantsUseCaseResponse> {
    const spin = await this.spinRepository.findById(spin_id);

    if (!spin) {
      throw new SpinNotFoundError();
    }

    const participants =
      await this.participateSpinRepository.getParticipants(spin_id);

    if (!participants) {
      return { participants: [] };
    }

    return { participants };
  }
}
