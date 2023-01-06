import { User } from "~~/server/app/domain/entities/User";
import { InMemoryAuthRepository } from "~~/server/app/repositories/Implementations/InMemory/InMemoryAuth.repository";
import { inMemoryDB } from "~~/server/database/in-memory-db";
import { ForgotPasswordUseCase } from "../ForgotPassword/ForgotPassword.useCase";
import { ResetPasswordUseCase } from "./ResetPassword.useCase";
import bcyrpt from "bcryptjs";

describe("Testing the Reset Password Use Case", () => {
  const repository = new InMemoryAuthRepository();

  const userData = { email: "existent-test@test.com", password: "12345678" };

  // Setup
  inMemoryDB.users.push(new User({ ...userData, name: "Test" }));
  const forgotPasswordUseCase = new ForgotPasswordUseCase(repository);

  it("Should reset the password", async () => {
    const { recoverToken } = await forgotPasswordUseCase.execute({
      email: userData.email,
    });

    const sut = new ResetPasswordUseCase(repository);

    await sut.execute({
      token: recoverToken,
      password: "1234567890",
    });

    expect(userData.password === inMemoryDB.users[0].password).toBeFalsy();
    expect(
      bcyrpt.compareSync("12345678", inMemoryDB.users[0].password)
    ).toBeFalsy();
    expect(
      bcyrpt.compareSync("1234567890", inMemoryDB.users[0].password)
    ).toBeTruthy();
  });
});
