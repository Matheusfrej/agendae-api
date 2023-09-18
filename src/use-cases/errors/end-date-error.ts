export class EndDateError extends Error {
  constructor() {
    super("A data de fim não pode ser antes da data de início");
  }
}
