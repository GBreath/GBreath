import { User } from "~~/server/app/domain/entities/User";
import { IAuthRepository } from "~~/server/app/repositories/Interfaces/IAuth.repository";
import { IGoalRepository } from "~~/server/app/repositories/Interfaces/IGoal.repository";
import { $st } from "~~/server/i18n/lib";

export class GoogleSignInUseCase {
  constructor(
    private repository: IAuthRepository,
    private goalRepository: IGoalRepository
  ) {}

  public async execute({
    credential,
  }: {
    credential: string;
  }): Promise<{ user: User; token: string }> {
    try {
      if (!this.repository.googleSignIn) {
        throw new Error(
          $st("auth.sorry_the_server_is_not_accepting_google_sign_in")
        );
      }

      const result = await this.repository.googleSignIn({
        credential,
      });

      if (result.isANewAccount) {
        await this.goalRepository.store({
          userId: result.user.id || "",
          days: 30,
        });
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}
