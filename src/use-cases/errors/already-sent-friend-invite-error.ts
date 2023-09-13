export class AlreadySentFriendInviteError extends Error {
  constructor() {
    super("Você já enviou uma solicitação para esse usuário");
  }
}
