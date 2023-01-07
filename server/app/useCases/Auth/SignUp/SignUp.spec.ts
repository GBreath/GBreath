import { InMemoryGoalRepository } from "~~/server/app/repositories/Implementations/InMemory/InMemoryGoal.repository";
import { inMemoryDB } from "~~/server/database/in-memory-db";
import { User } from "../../../domain/entities/User";
import { AppError } from "../../../domain/types/Error";
import { InMemoryAuthRepository } from "../../../repositories/Implementations/InMemory/InMemoryAuth.repository";
import { SignUpUseCase } from "./SignUp.useCase";

describe("Testing the Sign In UseCase", () => {
  const repository = new InMemoryAuthRepository();
  const goalRepository = new InMemoryGoalRepository();

  const userData = { email: "existent-test@test.com", password: "12345678" };

  // Setup
  inMemoryDB.users.push(new User({ ...userData, name: "Test" }));

  it("Should to Sign Up successfully and return the user data", async () => {
    const sut = new SignUpUseCase(repository, goalRepository);

    const result = await sut.execute({
      email: "test1@test.com",
      password: "12345678",
      name: "Test",
    });

    expect(result.token).toBeTruthy();
    expect(result.user.email).toEqual("test1@test.com");
    expect(result.user.email).toEqual(inMemoryDB.users[1].email);
    expect(inMemoryDB.goals[0].days).toEqual(30);
  });

  it("Should to Return an error because email is already in use", async () => {
    const sut = new SignUpUseCase(repository, goalRepository);

    try {
      const result = await sut.execute({
        email: "existent-test@test.com",
        name: "Test",
        password: "12345678",
      });

      expect(result).toBeFalsy();
    } catch (error) {
      expect((error as AppError).message).toBeTruthy();
    }
  });
});
