import { PrismaGoalRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaGoal.repository";
import { StoreGoalController } from "~~/server/app/useCases/Goal/Store/Store.controller";
import { StoreGoalUseCase } from "~~/server/app/useCases/Goal/Store/Store.useCase";

export default defineEventHandler(async (event) => {
  const repository = new PrismaGoalRepository();
  const useCase = new StoreGoalUseCase(repository);
  const controller = new StoreGoalController(useCase);

  return await controller.execute(event);
});
