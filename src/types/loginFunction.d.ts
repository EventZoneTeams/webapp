export type LoginResponseFromBackendServer = {
  status: boolean;
  message: string;
  jwt: string;
  jwtRefreshToken: string;
};
