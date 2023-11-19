import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { User } from "@prisma/client";

interface NotificationsUseCaseRequest {
  user_id: string;
}

interface TransformedNotification {
  type: string;
  id?: string;
  user?: { [P in keyof User]?: User[P] };
  organizer?: {
    id: string;
    name: string;
    nickname: string | null;
    profile_pic: string;
  };
  title?: string;
  updated_at: Date;
}

interface NotificationsUseCaseResponse {
  notifications: TransformedNotification[];
}

export class NotificationsUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    user_id,
  }: NotificationsUseCaseRequest): Promise<NotificationsUseCaseResponse> {
    const notifications = await this.usersRepository.getNotifications(user_id);

    if (!notifications) {
      return { notifications: [] };
    }

    const transformedNotifications: TransformedNotification[] = [];

    for (const notification of notifications) {
      if (notification.received_friend_solicitation) {
        for (const sent of notification.received_friend_solicitation) {
          transformedNotifications.push({
            type: "friend",
            user: {
              id: sent.sent.id,
              name: sent.sent.name,
              nickname: sent.sent.nickname,
              profile_pic: sent.sent.profile_pic,
            },
            updated_at: sent.updated_at,
          });
        }
      }

      if (notification.ParticipateSpin) {
        for (const spin of notification.ParticipateSpin) {
          transformedNotifications.push({
            type: "spin",
            organizer: spin.spin.organizer,
            id: spin.spin.id,
            title: spin.spin.title,
            updated_at: spin.updated_at,
          });
        }
      }
    }

    transformedNotifications.sort((a, b) => {
      const dateA = new Date(a.updated_at).getTime();
      const dateB = new Date(b.updated_at).getTime();
      return dateB - dateA;
    });

    return {
      notifications: transformedNotifications,
    };
  }
}
