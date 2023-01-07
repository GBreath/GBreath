import { Goal } from "~~/server/app/domain/entities/Goal";
import { IGoalRepository } from "~~/server/app/repositories/Interfaces/IGoal.repository";

export class StoreGoalUseCase {
  constructor(private repository: IGoalRepository) {}

  public async execute({
    days,
    userId,
  }: {
    days: number;
    userId: string;
  }): Promise<Goal> {
    try {
      const result = await this.repository.store({
        userId,
        days,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
