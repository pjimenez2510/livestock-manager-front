import {
  User as User,
  UserCreate,
} from "@/features/users/interfaces/user.interface";

export interface Login {
  username: string;
  password: string;
}

export type Register = UserCreate;

export interface AuthReponse {
  user: User;
  access_token: string;
}
