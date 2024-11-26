import { http } from "../config/axios";

export type User = {
  _id: string;
  username?: string;
  email: string;
  password: string;
};

export const registerUser = (data: User) => {
  return http.post("/register", data);
};

export const loginUser = (data: User) => {
  return http.post("/login", data);
};
