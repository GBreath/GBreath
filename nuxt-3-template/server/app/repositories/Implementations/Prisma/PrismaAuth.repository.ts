import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAuthRepository } from "../../Interfaces/IAuth.repository";
import { User } from "~~/server/app/domain/entities/User";
import { prismaClient } from "~~/server/database/db-client";
import { transporter } from "~~/server/app/services/mail";
import "dotenv/config";

export class PrismaAuthRepository implements IAuthRepository {
  public async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
        status: 1,
      },
    });

    if (!user) {
      throw new Error("Email or password went wrong!");
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
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

  public async signUp({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const emailAlreadyInUse = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (emailAlreadyInUse) {
      throw new Error("This email is already in use by another account!");
    }

    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        password: bcrypt.hashSync(password),
      },
    });

    const token = jwt.sign(
      { ...user, password: "protected-data" },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    return { user: { ...user, password: "protected-data" }, token };
  }

  public async forgotPassword({
    email,
  }: {
    email: string;
  }): Promise<{ recoverToken: string }> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || user.status === 0 || user.status === 2) {
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

    await transporter.sendMail({
      to: email,
      from: process.env.MAIL_USERNAME,
      subject: process.env.APP_NAME + " - Reset password",
      html: `
      <h2>Click in the link below to reset your password</h2>
      <p>The link below expires in 1 one hour</p>
      <br />
      <a href="${process.env.APP_URL}/auth/${recoverToken}/reset-password">Reset password</a>
    `.trim(),
    });

    return {
      recoverToken,
    };
  }

  public async resetPassword({
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

    if (!tokenData) {
      throw new Error("This link probably has been expired or not exists");
    }

    const email = tokenData.email;
    const oldPassHash = tokenData.passwordHash;

    const user = await prismaClient.user.findFirst({
      where: {
        email,
        status: {
          notIn: [0, 2],
        },
      },
    });

    if (user?.password !== oldPassHash) {
      throw new Error("This link probably has been expired or not exists");
    }

    if (!user) {
      throw new Error(
        "This user does not exists in our database or it was deleted!"
      );
    }

    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: bcrypt.hashSync(password, 8),
      },
    });
  }
}
