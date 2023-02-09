import { PrismaGoalRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaGoal.repository";
import { PrismaRecordRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaRecord.repository";
import { CurrentStreakController } from "~~/server/app/useCases/Record/CurrentStreak/CurrentStreak.controller";
import { CurrentStreakUseCase } from "~~/server/app/useCases/Record/CurrentStreak/CurrentStreak.useCase";

export default defineEventHandler(async (event) => {
  const goalRepository = new PrismaGoalRepository();
  const repository = new PrismaRecordRepository(goalRepository);
  const useCase = new CurrentStreakUseCase(repository);
  const controller = new CurrentStreakController(useCase);

  return await controller.execute(event);
});
