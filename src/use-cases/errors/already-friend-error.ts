export class AlreadyFriendError extends Error {
  constructor() {
    super("Você já tem esse usuário adicionado");
  }
}
