export type User = {
  id: string;
  email: string;
  fullName: string;
  dob: Date;
  gender: string;
  image: string;
  isDeleted: boolean;
  roleName: string;
  workingAt: string;
  role: {
    roleId: string;
    roleName: string;
  };
};
