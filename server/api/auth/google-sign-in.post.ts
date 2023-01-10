import { PrismaAuthRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaAuth.repository";
import { PrismaGoalRepository } from "~~/server/app/repositories/Implementations/Prisma/PrismaGoal.repository";
import { GoogleSignInController } from "~~/server/app/useCases/Auth/GoogleSignIn/GoogleSignIn.controller";
import { GoogleSignInUseCase } from "~~/server/app/useCases/Auth/GoogleSignIn/GoogleSignIn.useCase";

export default defineEventHandler(async (event) => {
  const repository = new PrismaAuthRepository();
  const goalRepository = new PrismaGoalRepository();
  const useCase = new GoogleSignInUseCase(repository, goalRepository);
  const controller = new GoogleSignInController(useCase);

  return await controller.execute(event);
});
