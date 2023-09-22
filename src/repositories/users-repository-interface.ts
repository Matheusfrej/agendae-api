import { Prisma, User } from "@prisma/client";
import { AllUserSpinsType } from "@/@types/prisma-query-types";

export interface UsersRepositoryInterface {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(user_id: string): Promise<User | null>;
  findByIdAndDelete(user_id: string): Promise<User | null>;
  findByIdAndUpdate(user_id: string, name: string): Promise<User | null>;
  findByIdAndUpdatePassword(
    user_id: string,
    password: string,
  ): Promise<User | null>;
  findMany(users_id: string[]): Promise<User[] | null>;
  findAllUserSpins(user_id: string): Promise<AllUserSpinsType>;
}
