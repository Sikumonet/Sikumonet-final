import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";

// Get all institutions details API call
export const getAllInstitutions = async () => {
  try {
    const response = await axios.get(`${ENDPOINT.INSTITUTION.GET_ALL}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Filter the institutions with name API call
export const filterInstitutionsWithName = async (institutionName: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.INSTITUTION.FILTER_WITH_NAME(institutionName)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Sort the institutions with name API call
export const sortInstitutionsWithName = async (sortingType: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.INSTITUTION.SORT_WITH_NAME(sortingType)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get single institution details API call
export const getSingleInstitution = async (userId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.INSTITUTION.GET_WITH_ID(userId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Create new institution API call
export const createInstitution = async (
  token: string,
  name: string,
  location: string,
  imageFile: any
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      `${ENDPOINT.INSTITUTION.GET_ALL}`,
      {
        name,
        location,
        imageFile,
      },
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Delete single institution API call
export const deleteSingleInstitution = async (
  token: string,
  userId: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.delete(
      `${ENDPOINT.INSTITUTION.GET_WITH_ID(userId)}`,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
