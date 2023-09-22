import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";

interface GetSpinsUseCaseRequest {
  user_id: string;
}

export class GetSpinsUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ user_id }: GetSpinsUseCaseRequest) {
    const spins = await this.usersRepository.findAllUserSpins(user_id);

    if (!spins) {
      return { spins: [] };
    }

    const { Spin, ParticipateSpin } = spins[0];

    const formattedParticipateSpin = ParticipateSpin.map((spin) => {
      return spin.spin;
    });

    const response = Spin.concat(formattedParticipateSpin);
    return { spins: response };
  }
}
