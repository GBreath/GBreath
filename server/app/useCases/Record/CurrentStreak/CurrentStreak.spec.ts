import moment from "moment";
import { Goal } from "~~/server/app/domain/entities/Goal";
import { InMemoryGoalRepository } from "~~/server/app/repositories/Implementations/InMemory/InMemoryGoal.repository";
import { InMemoryRecordRepository } from "~~/server/app/repositories/Implementations/InMemory/InMemoryRecord.repository";
import { inMemoryDB } from "~~/server/database/in-memory-db";
import { CurrentStreakUseCase } from "./CurrentStreak.useCase";

describe("Testing the CurrentStreak useCase", () => {
  const goalRepository = new InMemoryGoalRepository();
  const repository = new InMemoryRecordRepository(goalRepository);

  inMemoryDB.goals.push(
    new Goal({
      userId: "abc",
      days: 8,
    })
  );

  inMemoryDB.records = [
    {
      exerciceIndex: 2,
      repetitions: 7,
      userId: "abc",
      createdAt: moment().add(-1, "day").add(12, "hour").toDate(),
    },
    {
      exerciceIndex: 0,
      repetitions: 16,
      userId: "abc",
      createdAt: moment().add(-2, "day").add(12, "hour").toDate(),
    },
    {
      exerciceIndex: 0,
      repetitions: 16,
      userId: "abc",
      createdAt: moment().add(-3, "day").add(12, "hour").toDate(),
    },
    {
      exerciceIndex: 0,
      repetitions: 16,
      userId: "abc",
      createdAt: moment().add(-4, "day").add(12, "hour").toDate(),
    },
  ].reverse();

  it("Should return the streak with 3 days, the goal as 6, and progress as 50%", async () => {
    const sut = new CurrentStreakUseCase(repository);

    const result = await sut.execute({
      userId: "abc",
    });

    expect(result.goal).toEqual(8);
    expect(result.streak).toEqual(4);
    expect(result.progress).toEqual(50);
    expect(result.award).toEqual("silver-medal");
  });
});
