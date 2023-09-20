import { ParticipateSpin } from "@prisma/client";

export interface ParticipateSpinRepositoryInterface {
  getParticipateSpinNumber(user_id: string): Promise<number | null>;
  getPastParticipateSpinNumber(user_id: string): Promise<number | null>;
  getInvite(spin_id: string, user_id: string): Promise<ParticipateSpin | null>;
  inviteUser(spin_id: string, user_id: string): Promise<ParticipateSpin | null>;
  inviteUserAgain(participate_spin_id: string): Promise<ParticipateSpin | null>;
  acceptInvite(participate_spin_id: string): Promise<ParticipateSpin | null>;
  denyInvite(participate_spin_id: string): Promise<ParticipateSpin | null>;
}
