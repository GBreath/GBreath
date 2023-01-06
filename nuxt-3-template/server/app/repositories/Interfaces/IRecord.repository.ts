import { Record } from "../../domain/entities/Record";

export interface IRecordRepository {
  store({
    userId,
    exerciceIndex,
    repetitions,
  }: {
    userId: string;
    exerciceIndex: number;
    repetitions: number;
  }): Promise<Record>;
  findMany({ userId }: { userId: string }): Promise<Record[]>;
  findStreak({
    userId,
  }: {
    userId: string;
  }): Promise<{ streak: number; goal: number; progress: number }>;
}
