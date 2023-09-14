export class AlreadyBlockedError extends Error {
  constructor() {
    super("Você já é bloqueado por esse usuário");
  }
}
