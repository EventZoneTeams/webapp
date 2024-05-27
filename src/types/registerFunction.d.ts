import { User } from "@/types/authuser";

export type RegisterResponse = {
  status: boolean;
  message: string;
  data?: User;
};
