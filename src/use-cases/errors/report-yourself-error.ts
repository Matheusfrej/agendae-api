import { PreConditionalError } from "./pre-conditional-error";

export class ReportYourselfError extends PreConditionalError {
  constructor() {
    super(409, "Você não pode denunciar a si mesmo");
  }
}
