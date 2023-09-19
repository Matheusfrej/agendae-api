import { PreConditionalError } from "./pre-conditional-error";

export class AcceptFriendError extends PreConditionalError {
  constructor() {
    super(409, "Houve um erro ao aceitar a solicitação de amizade");
  }
}
