export class DenyFriendError extends Error {
  constructor() {
    super("Houve um erro ao recusar a solicitação de amizade");
  }
}
