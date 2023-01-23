import { StoreGoalUseCase } from "./Store.useCase";
import { H3Event } from "h3";
import { AppSuccess } from "~~/server/app/domain/types/Success";
import { AppError } from "~~/server/app/domain/types/Error";
import * as st from "simple-runtypes";
import { ensureAuthenticated } from "~~/server/app/middlewares/ensureAuthenticated.middleware";

export class StoreGoalController {
  constructor(private useCase: StoreGoalUseCase) {}

  public async execute(event: H3Event): Promise<AppError | AppSuccess> {
    try {
      const request = await readBody(event);
      const { user, error } = await ensureAuthenticated(event);
      await this.validation(request);

      if (error) {
        throw error;
      }

      const result = await this.useCase.execute({
        ...request,
        userId: user?.id,
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

  private async validation(request: unknown) {
    const validation = st.record({
      days: st.integer({
        min: 7,
        max: 3650,
      }),
    });

    const result = st.use(validation, request);

    if (!result.ok) {
      throw new Error(st.getFormattedError(result.error));
    }
  }
}
