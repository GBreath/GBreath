import { Goal } from "~/server/app/domain/entities/Goal";

export interface IGoalRepository {
  store({ userId, days }: { userId: string; days: number }): Promise<Goal>;
  findMany({ userId }: { userId: string }): Promise<Goal[]>;
  findCurrent({ userId }: { userId: string }): Promise<Goal>;
  findCurrentGoalByDate({
    userId,
    referenceDate,
  }: {
    userId: string;
    referenceDate: Date;
  }): Promise<Goal>;
}
