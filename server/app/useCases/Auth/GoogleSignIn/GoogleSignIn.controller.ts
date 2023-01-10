import { H3Event } from "h3";
import { AppError } from "../../../domain/types/Error";
import { AppSuccess } from "../../../domain/types/Success";
import * as st from "simple-runtypes";
import { JWT_REGEX_MATCH } from "~~/utils/regex";
import { GoogleSignInUseCase } from "./GoogleSignIn.useCase";

export class GoogleSignInController {
  constructor(private useCase: GoogleSignInUseCase) {}

  public async execute(event: H3Event): Promise<AppError | AppSuccess> {
    try {
      const request = await readBody(event);

      await this.validations(request);

      const result = await this.useCase.execute(request);

      event.node.res.statusCode = 200;

      return {
        result: {
          ...result,
          isANewAccount: undefined,
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
      credential: st.string({
        match: JWT_REGEX_MATCH,
        trim: true,
      }),
    });

    const result = st.use(validation, request);

    if (!result.ok) {
      throw new Error(st.getFormattedError(result.error));
    }
  }
}
