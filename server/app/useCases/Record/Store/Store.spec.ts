import { InMemoryGoalRepository } from "~~/server/app/repositories/Implementations/InMemory/InMemoryGoal.repository";
import { InMemoryRecordRepository } from "~~/server/app/repositories/Implementations/InMemory/InMemoryRecord.repository";
import { inMemoryDB } from "~~/server/database/in-memory-db";
import { StoreRecordUseCase } from "./Store.useCase";

describe("Testing the Store Record usecase", () => {
  const goalRepository = new InMemoryGoalRepository();
  const repository = new InMemoryRecordRepository(goalRepository);

  const userId = "abc";

  it("should to store without errors", async () => {
    const sut = new StoreRecordUseCase(repository);

    const result = await sut.execute({
      repetitions: 3,
      exerciceIndex: 1,
      userId,
    });

    expect(result.userId).toEqual(userId);
    expect(inMemoryDB.records[0]).toEqual(result);
  });
});
