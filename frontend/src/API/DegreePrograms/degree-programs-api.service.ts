import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";

// Get all degree programs details API call
export const getAllDegreePrograms = async () => {
  try {
    const response = await axios.get(`${ENDPOINT.DEGREE.GET_ALL}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get all degree programs related to the specific institution details API call
export const getAllDegreeProgramsRelatedToInstitution = async (
  institutionId: string
) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.DEGREE.GET_WITH_UNIVERSITY(institutionId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get single degree program details API call
export const getSingleDegreeProgram = async (userId: string) => {
  try {
    const response = await axios.get(`${ENDPOINT.DEGREE.GET_WITH_ID(userId)}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Create new degree program API call
export const createDegreeProgram = async (
  token: string,
  name: string,
  institution: string,
  imageFile: any
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      `${ENDPOINT.DEGREE.GET_ALL}`,
      {
        name,
        institution,
        imageFile,
      },
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Delete single degree program API call
export const deleteSingleDegreeProgram = async (
  token: string,
  userId: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.delete(
      `${ENDPOINT.DEGREE.GET_WITH_ID(userId)}`,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
