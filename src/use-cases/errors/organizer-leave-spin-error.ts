import { PreConditionalError } from "./pre-conditional-error";

export class OrganizerLeaveSpinError extends PreConditionalError {
  constructor() {
    super(409, "Você não pode sair do seu próprio rolê");
  }
}
