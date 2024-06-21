import { User } from "./user";

export type Student = User & {
  active: boolean;
};
