import { Record } from "~~/server/app/domain/entities/Record";
import { InMemoryGoalRepository } from "~~/server/app/repositories/Implementations/InMemory/InMemoryGoal.repository";
import { InMemoryRecordRepository } from "~~/server/app/repositories/Implementations/InMemory/InMemoryRecord.repository";
import { inMemoryDB } from "~~/server/database/in-memory-db";
import { FindManyRecordUseCase } from "./FindMany.useCase";

describe("Testing the FindMany Records useCase", () => {
  const goalRepository = new InMemoryGoalRepository();
  const repository = new InMemoryRecordRepository(goalRepository);

  inMemoryDB.records = [
    new Record({
      exerciceIndex: 1,
      repetitions: 3,
      userId: "abc",
    }),
    new Record({
      exerciceIndex: 2,
      repetitions: 7,
      userId: "abc",
    }),
    new Record({
      exerciceIndex: 0,
      repetitions: 16,
      userId: "abc",
    }),
  ];

  it("Should to return all record of the user", async () => {
    const sut = new FindManyRecordUseCase(repository);

    const result = await sut.execute({ userId: "abc" });

    expect(result.length).toEqual(3);
    expect(inMemoryDB.records).toEqual(result);
  });
});
