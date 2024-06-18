export type User = {
  Id: number;
  Email: string;
  UnsignFullName: string;
  FullName: string;
  Dob: Date;
  Gender: string;
  Image: string;
  University: string;
  IsDeleted: boolean;
  RoleName: string;
  Role: string;
};

export type BackendUser = {
  id: number;
  email: string;
  "unsign-full-name": string;
  "full-name": string;
  dob: Date;
  gender: string;
  image: string;
  university: string;
  "is-deleted": boolean;
  "role-name": string | null;
  role: string | null;
};
