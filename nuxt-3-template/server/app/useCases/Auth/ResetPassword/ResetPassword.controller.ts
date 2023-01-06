import { ResetPasswordUseCase } from "./ResetPassword.useCase";
import { H3Event } from "h3";
import { AppError } from "~~/server/app/domain/types/Error";
import { AppSuccess } from "~~/server/app/domain/types/Success";
import * as st from "simple-runtypes";

export class ResetPasswordController {
  constructor(private useCase: ResetPasswordUseCase) {}

  public async execute(event: H3Event): Promise<AppError | AppSuccess> {
    try {
      const request = await readBody(event);

      await this.validations(request);

      await this.useCase.execute(request);

      event.node.res.statusCode = 201;

      return {
        result: {
          message:
            "Your password has been successfully reseted. Try to login again!",
        },
      };
    } catch (error) {
      event.node.res.statusCode = 400;

      return {
        message: (error as AppError).message,
      };
    }
  }

  private async validations(request: unknown) {
    const validation = st.record({
      token: st.string({ trim: true }),
      password: st.string({ minLength: 8, trim: true }),
    });

    const result = st.use(validation, request);

    if (!result.ok) {
      throw new Error(st.getFormattedError(result.error));
    }
  }
}
