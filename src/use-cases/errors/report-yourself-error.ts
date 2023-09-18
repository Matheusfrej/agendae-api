export class ReportYourselfError extends Error {
  constructor() {
    super("Você não pode denunciar a si mesmo");
  }
}
