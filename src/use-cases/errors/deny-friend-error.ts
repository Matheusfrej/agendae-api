import { PreConditionalError } from "./pre-conditional-error";

export class DenyFriendError extends PreConditionalError {
  constructor() {
    super(409, "Houve um erro ao recusar a solicitação de amizade");
  }
}
