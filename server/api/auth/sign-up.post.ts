import { SignUpController } from "../../app/useCases/Auth/SignUp/SignUp.controller";
import { PrismaAuthRepository } from "../../app/repositories/Implementations/Prisma/PrismaAuth.repository";
import { SignUpUseCase } from "../../app/useCases/Auth/SignUp/SignUp.useCase";
import { PrismaGoalRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaGoal.repository";

export default defineEventHandler(async (event) => {
  const repository = new PrismaAuthRepository();
  const goalRepository = new PrismaGoalRepository();
  const useCase = new SignUpUseCase(repository, goalRepository);
  const controller = new SignUpController(useCase);

  return await controller.execute(event);
});
