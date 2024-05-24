export type LoginResponse = {
  status: boolean;
  message: string;
  jwt: string;
  jwtRefreshToken: string;
};

export type User = {
  id: number;
  email: string;
  unsignFullName: string;
  fullName: string;
  dob: Date;
  gender: string;
  image: string;
  isDeleted: boolean;
};

export type UserResponse = {
  status: boolean;
  message: string;
  data: User;
};
