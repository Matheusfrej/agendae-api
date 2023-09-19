import { PreConditionalError } from "./pre-conditional-error";

export class AlreadySentFriendInviteError extends PreConditionalError {
  constructor() {
    super(409, "Você já enviou uma solicitação para esse usuário");
  }
}
