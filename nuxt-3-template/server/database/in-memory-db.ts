import { Goal } from "../app/domain/entities/Goal";
import { Record } from "../app/domain/entities/Record";
import { User } from "../app/domain/entities/User";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const inMemoryDB: { users: User[]; records: Record[]; goals: Goal[] } = {
  users: [],
  records: [],
  goals: [],
};
