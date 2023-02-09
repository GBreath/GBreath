import crypto from "crypto";

export class Record {
  id?: string;
  exerciceIndex: number;
  repetitions: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ exerciceIndex, repetitions, userId }: Record) {
    this.id = crypto.randomUUID();
    this.exerciceIndex = exerciceIndex;
    this.repetitions = repetitions;
    this.userId = userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
