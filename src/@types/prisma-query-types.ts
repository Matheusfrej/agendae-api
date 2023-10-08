import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { Prisma } from "@prisma/client";

const prismaUsersRepository = new PrismaUsersRepository();

type AllUserSpinsType = Prisma.PromiseReturnType<
  typeof prismaUsersRepository.findAllUserSpins
>;

type getParticipantsType = {
  status: number;
  spin_id: string;
  received: {
    id: string;
    name: string;
    profile_pic: string;
  };
};

type getNotificationsType = {
  ParticipateSpin: {
    updated_at: Date;
    spin: {
      id: string;
      title: string;
      organizer: {
        id: string;
        name: string;
        nickname: string | null;
        profile_pic: string;
      };
    };
  }[];
  received_friend_solicitation: {
    updated_at: Date;
    sent: {
      id: string;
      name: string;
      nickname: string | null;
      profile_pic: string;
    };
  }[];
};

export { AllUserSpinsType, getParticipantsType, getNotificationsType };
