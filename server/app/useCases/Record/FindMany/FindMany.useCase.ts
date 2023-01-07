import { Record } from "~~/server/app/domain/entities/Record";
import { IRecordRepository } from "~~/server/app/repositories/Interfaces/IRecord.repository";

export class FindManyRecordUseCase {
  constructor(private repository: IRecordRepository) {}

  public async execute({ userId }: { userId: string }): Promise<Record[]> {
    try {
      const result = await this.repository.findMany({
        userId,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
