import { InMemoryGoalRepository } from "~~/server/app/repositories/Implementations/InMemory/InMemoryGoal.repository";
import { inMemoryDB } from "~~/server/database/in-memory-db";
import { StoreGoalUseCase } from "./Store.useCase";

describe("Testing the store store use case", () => {
  const repository = new InMemoryGoalRepository();

  it("Should to store correctly the goal", async () => {
    const sut = new StoreGoalUseCase(repository);

    const result = await sut.execute({
      days: 6,
      userId: "abc",
    });

    expect(result).toBeTruthy();
    expect(inMemoryDB.goals[0]).toEqual(result);
  });
});
