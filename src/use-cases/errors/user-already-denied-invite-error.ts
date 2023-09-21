import { PreConditionalError } from "./pre-conditional-error";

export class UserAlreadyDeniedInviteError extends PreConditionalError {
  constructor() {
    super(409, "Você já recusou esse convite de rolê");
  }
}
