export class AlreadyReportedError extends Error {
  constructor() {
    super("Você já denunciou esse usuário");
  }
}
