import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";
import { IUserData } from "../../common/types/user-data.interface";

// Get all users details API call
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${ENDPOINT.USER.GET_ALL}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get single user details API call
export const getSingleUser = async (userId: string) => {
  try {
    const response = await axios.get(`${ENDPOINT.USER.GET_WITH_ID(userId)}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Update single user API call
export const updateSingleUser = async (
  token: string,
  userId: string,
  updatedData: IUserData
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const updatedUserData = {
    name: updatedData?.name,
    institution: updatedData?.institution,
    degreeProgramme: updatedData?.degreeProgramme,
    academicYear: updatedData?.academicYear,
    userAvatar: updatedData?.userAvatar,
  };
  try {
    const response = await axios.put(
      `${ENDPOINT.USER.GET_WITH_ID(userId)}`,
      updatedUserData,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Delete single user API call
export const deleteSingleUser = async (userId: string) => {
  try {
    const response = await axios.delete(`${ENDPOINT.USER.GET_WITH_ID(userId)}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
