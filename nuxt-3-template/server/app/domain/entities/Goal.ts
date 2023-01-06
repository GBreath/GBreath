import crypto from "crypto";

export class Goal {
  id?: string;
  days: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ userId, days }: Goal) {
    this.id = crypto.randomUUID();
    this.userId = userId;
    this.days = days;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
