import { PreConditionalError } from "./pre-conditional-error";

export class CreateSpinError extends PreConditionalError {
  constructor() {
    super(400, "Houve um erro ao criar o rolê");
  }
}
