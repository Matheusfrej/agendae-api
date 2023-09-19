import { Spin } from "@prisma/client";
import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { SpinNotFoundError } from "./errors/spin-not-found-error";

interface GetSpinUseCaseRequest {
  spin_id: string;
}

interface GetSpinUseCaseResponse {
  spin: Spin;
}

export class GetSpinUseCase {
  constructor(private spinRepository: SpinRepositoryInterface) {}

  async execute({
    spin_id,
  }: GetSpinUseCaseRequest): Promise<GetSpinUseCaseResponse> {
    const spin = await this.spinRepository.findById(spin_id);

    if (!spin) {
      throw new SpinNotFoundError();
    }

    return { spin };
  }
}
