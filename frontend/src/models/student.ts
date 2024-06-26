import { User } from "./user";

export type Student = User & {
  phone: string;
  cpf: string;
  course: string;
  registration: string;
};
