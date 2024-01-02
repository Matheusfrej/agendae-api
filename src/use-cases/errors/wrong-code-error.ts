import { PreConditionalError } from "./pre-conditional-error";

export class WrongCodeError extends PreConditionalError {
  constructor() {
    super(400, "O código está incorreto");
  }
}
