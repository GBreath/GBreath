import { PrismaGoalRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaGoal.repository";
import { PrismaRecordRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaRecord.repository";
import { FindManyRecordController } from "~~/server/app/useCases/Record/FindMany/FindMany.controller";
import { FindManyRecordUseCase } from "~~/server/app/useCases/Record/FindMany/FindMany.useCase";

export default defineEventHandler(async (event) => {
  const goalRepository = new PrismaGoalRepository();
  const repository = new PrismaRecordRepository(goalRepository);
  const useCase = new FindManyRecordUseCase(repository);
  const controller = new FindManyRecordController(useCase);

  return await controller.execute(event);
});
