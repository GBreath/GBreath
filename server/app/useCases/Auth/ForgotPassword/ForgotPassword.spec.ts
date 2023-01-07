import { User } from "~~/server/app/domain/entities/User";
import { AppError } from "~~/server/app/domain/types/Error";
import { InMemoryAuthRepository } from "~~/server/app/repositories/Implementations/InMemory/InMemoryAuth.repository";
import { inMemoryDB } from "~~/server/database/in-memory-db";
import { ForgotPasswordUseCase } from "./ForgotPassword.useCase";

describe("Testing the ForgotPassword Use Case", () => {
  const repository = new InMemoryAuthRepository();

  const userData = { email: "existent-test@test.com", password: "12345678" };

  // Setup
  inMemoryDB.users.push(new User({ ...userData, name: "Test" }));

  it("Should return the recoverToken when it executes", async () => {
    const sut = new ForgotPasswordUseCase(repository);

    const result = await sut.execute({ email: userData.email });

    expect(result.recoverToken).toBeTruthy();
  });

  it("Should fail because the email is not associated to an user", async () => {
    const sut = new ForgotPasswordUseCase(repository);

    try {
      const result = await sut.execute({ email: "test@test.com" });

      expect(result.recoverToken).toBeFalsy();
    } catch (error) {
      expect((error as AppError).message).toBeTruthy();
    }
  });
});
