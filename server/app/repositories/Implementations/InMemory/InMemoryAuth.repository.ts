import { User } from "~~/server/app/domain/entities/User";
import { inMemoryDB } from "~~/server/database/in-memory-db";
import { IAuthRepository } from "../../Interfaces/IAuth.repository";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export class InMemoryAuthRepository implements IAuthRepository {
  async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const user = inMemoryDB.users.find((user) => user.email === email);

    if (!user) {
      throw new Error("Email or password went wrong!");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Email or password went wrong!");
    }

    const token = jwt.sign(
      { ...user, password: "protected-data" },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    return { user: { ...user, password: "protected-data" }, token };
  }

  async signUp({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const emailAlreadyInUse = inMemoryDB.users.find(
      (user) => user.email === email
    );

    if (emailAlreadyInUse) {
      throw new Error("This email is already in use by another account!");
    }

    const newUser = new User({
      email,
      name,
      password,
    });

    inMemoryDB.users.push(newUser);

    const token = jwt.sign(
      { ...newUser, password: "protected-data" },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    return { user: { ...newUser, password: "protected-data" }, token };
  }

  async forgotPassword({
    email,
  }: {
    email: string;
  }): Promise<{ recoverToken: string }> {
    const user = inMemoryDB.users.find((user) => user.email === email);

    if (!user || [2, 0].includes(user?.status || 0)) {
      throw new Error(
        "This user does not exists in our database or it was deleted!"
      );
    }

    const recoverToken = jwt.sign(
      {
        email: user.email,
        passwordHash: user.password,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return {
      recoverToken,
    };
  }

  async resetPassword({
    token,
    password,
  }: {
    token: string;
    password: string;
  }): Promise<void> {
    const tokenData = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const email = tokenData.email;
    const oldPassHash = tokenData.passwordHash;

    const user = inMemoryDB.users.find(
      (user) => user.email === email && ![0, 2].includes(user?.status || 0)
    );
    const userIndex = inMemoryDB.users.findIndex(
      (user) => user.email === email && ![0, 2].includes(user?.status || 0)
    );

    if (!user) {
      throw new Error(
        "This user does not exists in our database or it was deleted!"
      );
    }

    if (user?.password !== oldPassHash) {
      throw new Error("This link probably has been expired or not exists");
    }

    inMemoryDB.users[userIndex].password = bcrypt.hashSync(password);
  }
}
