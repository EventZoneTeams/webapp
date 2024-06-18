import { BackendUser, User } from "@/types/authuser";

export const mapBackendUserToUser = (backendUser: BackendUser): User => {
  return {
    Id: backendUser.id,
    Email: backendUser.email,
    UnsignFullName: backendUser["unsign-full-name"],
    FullName: backendUser["full-name"],
    Dob: new Date(backendUser.dob),
    Gender: backendUser["gender"],
    Image: backendUser.image,
    University: backendUser.university,
    IsDeleted: backendUser["is-deleted"],
    RoleName: backendUser["role-name"] || "",
    Role: backendUser.role || "",
  };
};
