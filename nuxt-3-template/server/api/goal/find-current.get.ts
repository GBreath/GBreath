import { PrismaGoalRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaGoal.repository";
import { FindCurrentGoalController } from "~~/server/app/useCases/Goal/FindCurrent/FindCurrent.controller";
import { FindCurrentGoalUseCase } from "~~/server/app/useCases/Goal/FindCurrent/FindCurrent.useCase";

export default defineEventHandler(async (event) => {
  const repository = new PrismaGoalRepository();
  const useCase = new FindCurrentGoalUseCase(repository);
  const controller = new FindCurrentGoalController(useCase);

  return await controller.execute(event);
});
