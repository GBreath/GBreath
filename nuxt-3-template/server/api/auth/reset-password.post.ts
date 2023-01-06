import { ResetPasswordController } from "../../app/useCases/Auth/ResetPassword/ResetPassword.controller";
import { PrismaAuthRepository } from "../../app/repositories/Implementations/Prisma/PrismaAuth.repository";
import { ResetPasswordUseCase } from "../../app/useCases/Auth/ResetPassword/ResetPassword.useCase";

export default defineEventHandler(async (event) => {
  const repository = new PrismaAuthRepository();
  const useCase = new ResetPasswordUseCase(repository);
  const controller = new ResetPasswordController(useCase);

  return await controller.execute(event);
});
