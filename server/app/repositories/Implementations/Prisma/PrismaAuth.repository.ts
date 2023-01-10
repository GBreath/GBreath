import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAuthRepository } from "../../Interfaces/IAuth.repository";
import { User } from "~~/server/app/domain/entities/User";
import { prismaClient } from "~~/server/database/db-client";
import { transporter } from "~~/server/app/services/mail";
import { $st } from "~~/server/i18n/lib";
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
      throw new Error($st("auth.email_or_password_went_wrong"));
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      throw new Error($st("auth.email_or_password_went_wrong"));
    }

    const token = jwt.sign(
      { ...user, password: "protected-data" },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
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
      throw new Error($st("auth.this_email_is_already_in_use"));
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
        expiresIn: "7d",
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
      throw new Error($st("auth.this_user_does_not_exists"));
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
      subject: `${process.env.APP_NAME} - ${$st("auth.reset_password")}`,
      html: `
      <h2>${$st("auth.click_in_the_link_below")}</h2>
      <p>${$st("auth.the_link_below_expires_in_one_hour")}</p>
      <br />
      <a href="${
        process.env.APP_URL
      }/auth/${recoverToken}/reset-password">${$st("auth.reset_password")}</a>
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
      throw new Error($st("auth.this_link_probably_has_been"));
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
      throw new Error($st("auth.this_link_probably_has_been"));
    }

    if (!user) {
      throw new Error($st("auth.this_user_does_not_exists"));
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
