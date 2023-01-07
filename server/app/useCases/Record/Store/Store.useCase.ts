import { Record } from "~~/server/app/domain/entities/Record";
import { IRecordRepository } from "~~/server/app/repositories/Interfaces/IRecord.repository";

export class StoreRecordUseCase {
  constructor(private repository: IRecordRepository) {}

  public async execute({
    repetitions,
    exerciceIndex,
    userId,
  }: {
    repetitions: number;
    exerciceIndex: number;
    userId: string;
  }): Promise<Record> {
    try {
      const result = await this.repository.store({
        repetitions,
        exerciceIndex,
        userId,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
