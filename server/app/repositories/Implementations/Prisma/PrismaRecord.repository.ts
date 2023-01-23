import { Record } from "~~/server/app/domain/entities/Record";
import { IGoalRepository } from "../../Interfaces/IGoal.repository";
import { IRecordRepository } from "../../Interfaces/IRecord.repository";
import { mapRange } from "~~/utils/mapRange";
import moment from "moment";
import { prismaClient } from "~~/server/database/db-client";
import { getAward } from "~~/server/app/utils/getAward";

export class PrismaRecordRepository implements IRecordRepository {
  constructor(private goalRepository: IGoalRepository) {}

  public async store({
    userId,
    exerciceIndex,
    repetitions,
  }: {
    userId: string;
    exerciceIndex: number;
    repetitions: number;
  }): Promise<Record> {
    const newRecord = await prismaClient.record.create({
      data: {
        exerciceIndex,
        repetitions,
        userId,
      },
    });

    return newRecord as Record;
  }

  public async findMany({ userId }: { userId: string }): Promise<Record[]> {
    const userRecords = await prismaClient.record.findMany({
      where: {
        userId,
      },
    });

    return userRecords as Record[];
  }

  public async findStreak({ userId }: { userId: string }): Promise<{
    streak: number;
    goal: number;
    progress: number;
    award: string;
  }> {
    const userRecords = await this.findMany({ userId });

    const descSortedRecords = userRecords
      .sort(
        (a, b) =>
          moment(a?.createdAt).valueOf() - moment(b?.createdAt).valueOf()
      )
      .reverse();

    const streakCanBeSaved = descSortedRecords[0]
      ? moment().diff(moment(descSortedRecords[0].createdAt), "hours") >= 24
        ? false
        : true
      : false;

    function currentStreak() {
      let oneItemWasAdded = false;

      const onlyDates = [
        ...new Set(
          descSortedRecords.map((r) => moment(r.createdAt).format("YYYY-MM-DD"))
        ),
      ];

      if (
        streakCanBeSaved &&
        !onlyDates.includes(moment().format("YYYY-MM-DD"))
      ) {
        onlyDates.unshift(moment().format("YYYY-MM-DD"));
        oneItemWasAdded = true;
      }

      let count = 0;

      onlyDates.forEach((el, i) => {
        if (
          new Date(moment().format("YYYY-MM-DD")).setUTCHours(0, 0, 0, 0) -
            new Date(el).setUTCHours(0, 0, 0, 0) ===
          i * 86400000
        )
          count++;
      });

      return oneItemWasAdded ? count - 1 : count;
    }

    const streak = streakCanBeSaved ? currentStreak() : 0;

    const goal = await this.goalRepository.findCurrent({ userId });

    const progress = mapRange(streak, 0, goal.days, 0, 100);

    const award = getAward(goal.days, progress);

    return {
      streak,
      goal: goal.days,
      progress,
      award,
    };
  }
}
