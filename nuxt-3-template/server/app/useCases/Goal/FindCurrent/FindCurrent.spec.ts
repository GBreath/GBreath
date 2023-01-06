import { Goal } from "~~/server/app/domain/entities/Goal";
import { InMemoryGoalRepository } from "~~/server/app/repositories/Implementations/InMemory/InMemoryGoal.repository";
import { inMemoryDB } from "~~/server/database/in-memory-db";
import { FindCurrentGoalUseCase } from "./FindCurrent.useCase";

describe("Testing the FindCurrent store use case", () => {
  const repository = new InMemoryGoalRepository();

  inMemoryDB.goals.push(
    new Goal({
      days: 6,
      userId: "abc",
    })
  );

  it("Should to find all the goals correctly", async () => {
    const sut = new FindCurrentGoalUseCase(repository);

    const result = await sut.execute({
      userId: "abc",
    });

    expect(result).toBeTruthy();
    expect(inMemoryDB.goals[0]).toEqual(result);
  });
});
