import { User } from "../../domain/entities/User";

export interface IAuthRepository {
  signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }>;
  signUp({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ user: User; token: string }>;
  resetPassword({
    token,
    password,
  }: {
    token: string;
    password: string;
  }): Promise<void>;
  forgotPassword({
    email,
  }: {
    email: string;
  }): Promise<{ recoverToken: string }>;
}
