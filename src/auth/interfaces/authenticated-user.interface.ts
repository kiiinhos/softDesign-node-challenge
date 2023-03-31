import { User } from "../../user/interfaces/user.interface";

export interface AuthenticatedUser {
  token: string;
  user: Omit<User, 'password'>;
}
