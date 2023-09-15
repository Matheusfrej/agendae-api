export class UnblockYourselfError extends Error {
  constructor() {
    super("Você não pode desbloquear você mesmo");
  }
}
