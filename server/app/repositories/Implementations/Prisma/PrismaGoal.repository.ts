import moment, { Moment } from "moment";
import { Goal } from "~~/server/app/domain/entities/Goal";
import { prismaClient } from "~~/server/database/db-client";
import { $st } from "~~/server/i18n/lib";
import { IGoalRepository } from "../../Interfaces/IGoal.repository";

export class PrismaGoalRepository implements IGoalRepository {
  public async store({
    userId,
    days,
  }: {
    userId: string;
    days: number;
  }): Promise<Goal> {
    const newGoal = await prismaClient.goal.create({
      data: {
        days,
        userId,
      },
    });

    return newGoal as Goal;
  }

  public async findMany({ userId }: { userId: string }): Promise<Goal[]> {
    const goals = await prismaClient.goal.findMany({
      where: {
        userId,
      },
    });

    return goals as Goal[];
  }

  public async findCurrent({ userId }: { userId: string }): Promise<Goal> {
    const goals = await this.findMany({ userId });

    const currentGoal = goals
      .sort(
        (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
      )
      .reverse()[0];

    return currentGoal;
  }

  public async findCurrentGoalByDate({
    userId,
    referenceDate,
  }: {
    userId: string;
    referenceDate: Date;
  }): Promise<Goal> {
    const goals = await this.findMany({ userId });

    const descSortedGoals = goals
      .sort(
        (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
      )
      .reverse();

    // if the reference date is after the current goal
    if (moment(referenceDate).isAfter(moment(descSortedGoals[0].createdAt))) {
      return descSortedGoals[0];
    }

    let lastHighest: Moment | null = null;
    let firstLowest: Moment | null = null;

    const currentGoalByDate = descSortedGoals.find((goal) => {
      // if there is an lowerst value
      if (firstLowest) {
        return lastHighest;
      }

      // if the goal creation date is after the reference date
      if (moment(goal.createdAt).isAfter(moment(referenceDate))) {
        lastHighest = moment(referenceDate);
      }

      // if the goal creation date is before the reference date
      if (moment(goal.createdAt).isBefore(moment(referenceDate))) {
        firstLowest = moment(referenceDate);
      }
    });

    if (!currentGoalByDate) {
      throw new Error($st("goal.there_is_not_goal_to_this_date"));
    }

    return currentGoalByDate;
  }
}
