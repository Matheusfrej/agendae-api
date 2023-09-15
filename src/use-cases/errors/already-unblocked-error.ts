export class AlreadyUnblockedError extends Error {
  constructor() {
    super("Você não tem esse usuário bloqueado");
  }
}
