import { PreConditionalError } from "./pre-conditional-error";

export class AddYourselfError extends PreConditionalError {
  constructor() {
    super(409, "Não é possível adicionar você mesmo como amigo");
  }
}
