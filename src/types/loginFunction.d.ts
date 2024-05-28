export type LoginResponse = {
  status: boolean;
  message: string;
  jwt: string;
  jwtRefreshToken: string;
  expired: Date;
};
