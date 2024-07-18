import { axiosClient } from "@/api/axiosClient";
import { mapBackendUsersToUsers, mapBackendUserToUser } from "@/lib/user";
import { BackendUser } from "@/types/authuser";

export interface GetUserSendData {
  PageIndex?: number;
  PageSize?: number;
  SortBy?: string;
  SortDirection?: string;
  Role?: string;
  isDeleted?: boolean;
  Gender?: string;
  SearchName?: string;
}

export const getuser = async (data: GetUserSendData) => {
  try {
    let baseUrl = "/users";
    let params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof GetUserSendData];
      if (value !== null && value !== undefined) {
        params.append(key, value.toString());
      }
    });
    const queryString = params.toString();
    if (queryString) {
      baseUrl = baseUrl.concat(`?${queryString}`);
    }
    const response = (await axiosClient.get<BackendUser[]>(baseUrl)).data;
    return mapBackendUsersToUsers(response);
  } catch (error) {
    throw error;
  }
};

export interface GetUserByIdResponse {
  success: boolean;
  message: string;
  data: BackendUser;
}

export const getUserById = async (userId: number) => {
  try {
    const response = (
      await axiosClient.get<GetUserByIdResponse>(`/users/${userId}`)
    ).data;
    return {
      success: response.success,
      message: response.message,
      data: mapBackendUserToUser(response.data),
    };
  } catch (error) {
    throw error;
  }
};

export interface CreateManagerSendData {
  email: string;
  password: string;
  "full-name": string;
  dob: Date;
  gender: string;
}

export interface CreateManagerResponse {
  success: boolean;
  message: string;
  data: BackendUser;
}

export const createManager = async (data: CreateManagerSendData) => {
  try {
    const response = await axiosClient.post<CreateManagerResponse>(
      `/users/manager`,
      data
    );
    return {
      success: response.data.success,
      message: response.data.message,
      data: mapBackendUserToUser(response.data.data),
    };
  } catch (error) {
    throw error;
  }
};

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}
export const deleteUser = async (userId: number) => {
  try {
    const response = await axiosClient.delete<DeleteUserResponse>(
      `/users/${userId}`
    );
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    throw error;
  }
};
