import { FindManyRecordUseCase } from "./FindMany.useCase";
import { H3Event } from "h3";
import { AppSuccess } from "~~/server/app/domain/types/Success";
import { AppError } from "~~/server/app/domain/types/Error";
import { ensureAuthenticated } from "~~/server/app/middlewares/ensureAuthenticated.middleware";

export class FindManyRecordController {
  constructor(private useCase: FindManyRecordUseCase) {}

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
