import { IAuthRepository } from "~~/server/app/repositories/Interfaces/IAuth.repository";

export class ResetPasswordUseCase {
  constructor(private repository: IAuthRepository) {}

  public async execute({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) {
    try {
      const result = await this.repository.resetPassword({ token, password });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
