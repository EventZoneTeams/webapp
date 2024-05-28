export type GetMeResponse = {
  status: boolean;
  message: string;
  data?: User;
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
  roleName: string;
};
