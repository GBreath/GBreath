import { Goal } from "~~/server/app/domain/entities/Goal";
import { IGoalRepository } from "~~/server/app/repositories/Interfaces/IGoal.repository";

export class FindCurrentGoalUseCase {
  constructor(private repository: IGoalRepository) {}

  public async execute({ userId }: { userId: string }): Promise<Goal> {
    try {
      const result = await this.repository.findCurrent({
        userId,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
