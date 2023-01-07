import { ForgotPasswordUseCase } from "./ForgotPassword.useCase";
import { H3Event } from "h3";
import { AppError } from "~~/server/app/domain/types/Error";
import { AppSuccess } from "~~/server/app/domain/types/Success";
import * as st from "simple-runtypes";
import { EMAIL_REGEX_MATCH } from "~~/utils/regex";

export class ForgotPasswordController {
  constructor(private useCase: ForgotPasswordUseCase) {}

  public async execute(event: H3Event): Promise<AppError | AppSuccess> {
    try {
      const request = await readBody(event);

      await this.validations(request);

      await this.useCase.execute(request);

      return {
        result: {
          message: "An email with a reset link was sent to your mail!",
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
      email: st.string({ match: EMAIL_REGEX_MATCH, trim: true }),
    });

    const result = st.use(validation, request);

    if (!result.ok) {
      throw new Error(st.getFormattedError(result.error));
    }
  }
}
