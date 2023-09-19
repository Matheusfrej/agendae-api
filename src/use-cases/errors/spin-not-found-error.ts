import { PreConditionalError } from "./pre-conditional-error";

export class SpinNotFoundError extends PreConditionalError {
  constructor() {
    super(404, "Rolê não encontrado");
  }
}
