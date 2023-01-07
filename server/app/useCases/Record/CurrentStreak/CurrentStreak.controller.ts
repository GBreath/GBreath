import { H3Event } from "h3";
import { AppSuccess } from "~~/server/app/domain/types/Success";
import { AppError } from "~~/server/app/domain/types/Error";
import { CurrentStreakUseCase } from "./CurrentStreak.useCase";
import { ensureAuthenticated } from "~~/server/app/middlewares/ensureAuthenticated.middleware";

export class CurrentStreakController {
  constructor(private useCase: CurrentStreakUseCase) {}

  public async execute(event: H3Event): Promise<AppError | AppSuccess> {
    try {
      const { error, user } = await ensureAuthenticated(event);

      if (error) {
        throw error;
      }

      const result = await this.useCase.execute({ userId: user?.id || "" });

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
