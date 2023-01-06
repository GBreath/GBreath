import { IGoalRepository } from "~~/server/app/repositories/Interfaces/IGoal.repository";
import { User } from "../../../domain/entities/User";
import { IAuthRepository } from "../../../repositories/Interfaces/IAuth.repository";

export class SignUpUseCase {
  constructor(
    private repository: IAuthRepository,
    private goalRepository: IGoalRepository
  ) {}

  public async execute({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    try {
      const result = await this.repository.signUp({ email, name, password });

      await this.goalRepository.store({
        days: 30,
        userId: result.user.id || "",
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
