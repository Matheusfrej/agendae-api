import { Block, User } from "@prisma/client";

export interface BlockRepositoryInterface {
  isThereBlock(user_id: string, another_id: string): Promise<boolean>;
  didYouBlock(user_id: string, another_id: string): Promise<boolean>;
  wereYouBlocked(user_id: string, another_id: string): Promise<boolean>;
  createBlock(user_id: string, another_id: string): Promise<Block | null>;
  removeBlock(user_id: string, another_id: string): Promise<Block | null>;
  getBlocks(user_id: string): Promise<User[] | null>;
}
