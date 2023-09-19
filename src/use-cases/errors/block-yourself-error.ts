import { PreConditionalError } from "./pre-conditional-error";

export class BlockYourselfError extends PreConditionalError {
  constructor() {
    super(409, "Você não pode bloquear a si mesmo");
  }
}
