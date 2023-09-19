import { PreConditionalError } from "./pre-conditional-error";

export class AlreadyReportedError extends PreConditionalError {
  constructor() {
    super(409, "Você já denunciou esse usuário");
  }
}
