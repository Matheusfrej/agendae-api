export class BlockedError extends Error {
  constructor() {
    super("Você é bloqueado por esse usuário");
  }
}
