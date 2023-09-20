import { SpinNotFoundError } from "./errors/spin-not-found-error";
import { SpinRepositoryInterface } from "@/repositories/spin-repository-interface";
import { AccessDeniedError } from "./errors/access-denied-error";

interface DeleteSpinUseCaseRequest {
  spin_id: string;
  user_id: string;
}

export class DeleteSpinUseCase {
  constructor(private spinRepository: SpinRepositoryInterface) {}

  async execute({ spin_id, user_id }: DeleteSpinUseCaseRequest) {
    const spin = await this.spinRepository.findById(spin_id);

    if (!spin) {
      throw new SpinNotFoundError();
    }

    if (spin.organizer_id !== user_id) {
      throw new AccessDeniedError();
    }

    await this.spinRepository.findByIdAndDelete(spin_id);
  }
}
