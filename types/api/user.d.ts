//SignIn
export type LoginRequest = {
  email: "string";
  password: "string";
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  dob: Date;
  gender: string;
  workAt: string;
  imageUrl: string;
};

//Refresh Token
export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type GetAllUserParams = {
  PageIndex?: number;
  PageSize?: number;
  SortBy?: string;
  SortDirection?: string;
  Role?: string;
  isDeleted?: boolean;
  Gender?: string;
  SearchName?: string;
  SearchEmail?: string;
};
