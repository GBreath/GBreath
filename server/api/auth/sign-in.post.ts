import { PrismaAuthRepository } from "../../app/repositories/Implementations/Prisma/PrismaAuth.repository";
import { SignInController } from "../../app/useCases/Auth/SignIn/SignIn.controller";
import { SignInUseCase } from "../../app/useCases/Auth/SignIn/SignIn.useCase";

export default defineEventHandler(async (event) => {
  const repository = new PrismaAuthRepository();
  const useCase = new SignInUseCase(repository);
  const controller = new SignInController(useCase);

  return await controller.execute(event);
});
