import { IRecordRepository } from "~~/server/app/repositories/Interfaces/IRecord.repository";

export class CurrentStreakUseCase {
  constructor(private repository: IRecordRepository) {}

  public async execute({ userId }: { userId: string }): Promise<{
    streak: number;
    goal: number;
    progress: number;
    award: string;
  }> {
    try {
      const result = await this.repository.findStreak({
        userId,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
