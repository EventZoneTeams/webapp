export type User = {
  id: string;
  email: string;
  fullName: string;
  dob: Date;
  gender: string;
  imageUrl: string;
  isDeleted: boolean;
  roleName: string;
  workAt: string;
  role: {
    roleId: string;
    roleName: string;
  };
};
