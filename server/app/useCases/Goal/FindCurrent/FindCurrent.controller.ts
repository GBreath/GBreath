import { FindCurrentGoalUseCase } from "./FindCurrent.useCase";
import { H3Event } from "h3";
import { AppSuccess } from "~~/server/app/domain/types/Success";
import { AppError } from "~~/server/app/domain/types/Error";
import { ensureAuthenticated } from "~~/server/app/middlewares/ensureAuthenticated.middleware";

export class FindCurrentGoalController {
  constructor(private useCase: FindCurrentGoalUseCase) {}

  public async execute(event: H3Event): Promise<AppError | AppSuccess> {
    try {
      const { user, error } = await ensureAuthenticated(event);

      if (error) {
        throw error;
      }

      const result = await this.useCase.execute({
        userId: user?.id || "",
      });

      return {
        result,
      };
    } catch (error) {
      event.node.res.statusCode = 400;

      return {
        message: (error as AppError).message,
      };
    }
  }
}
