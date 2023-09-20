import { Prisma, User } from "@prisma/client";

export interface UsersRepositoryInterface {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(user_id: string): Promise<User | null>;
  findByIdAndDelete(user_id: string): Promise<User | null>;
  findByIdAndUpdate(user_id: string, name: string): Promise<User | null>;
  findMany(users_id: string[]): Promise<User[] | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findAllUserSpins(user_id: string): Promise<any>;
}
