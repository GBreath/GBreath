import bcrypt from "bcryptjs";
import crypto from "crypto";

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  sub?: string | null;
  role?: number;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ name, email, password, role, status, sub }: User) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.email = email;
    this.password = bcrypt.hashSync(password);
    this.role = role != undefined ? role : 3;
    this.status = status != undefined ? status : 1;
    this.sub = sub || null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
