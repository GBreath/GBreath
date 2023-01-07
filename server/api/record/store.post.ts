import { PrismaGoalRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaGoal.repository";
import { PrismaRecordRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaRecord.repository";
import { StoreRecordController } from "~~/server/app/useCases/Record/Store/Store.controller";
import { StoreRecordUseCase } from "~~/server/app/useCases/Record/Store/Store.useCase";

export default defineEventHandler(async (event) => {
  const goalRepository = new PrismaGoalRepository();
  const repository = new PrismaRecordRepository(goalRepository);
  const useCase = new StoreRecordUseCase(repository);
  const controller = new StoreRecordController(useCase);

  return await controller.execute(event);
});
