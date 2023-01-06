import { ForgotPasswordController } from "../../app/useCases/Auth/ForgotPassword/ForgotPassword.controller";
import { PrismaAuthRepository } from "../../app/repositories/Implementations/Prisma/PrismaAuth.repository";
import { ForgotPasswordUseCase } from "../../app/useCases/Auth/ForgotPassword/ForgotPassword.useCase";

export default defineEventHandler(async (event) => {
  const repository = new PrismaAuthRepository();
  const useCase = new ForgotPasswordUseCase(repository);
  const controller = new ForgotPasswordController(useCase);

  return await controller.execute(event);
});
