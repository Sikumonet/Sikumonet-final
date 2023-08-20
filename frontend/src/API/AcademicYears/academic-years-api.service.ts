import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";

// Get all academic years details API call
export const getAllAcademicYears = async () => {
  try {
    const response = await axios.get(`${ENDPOINT.ACADEMIC_YEAR.GET_ALL}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get all academic years related to the specific degree program details API call
export const getAllAcademicYearsRelatedToDegreeProgram = async (
  degreeProgramId: string
) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.ACADEMIC_YEAR.GET_WITH_DEGREE_PROGRAM(degreeProgramId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get single academic year details API call
export const getSingleAcademicYear = async (userId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.ACADEMIC_YEAR.GET_WITH_ID(userId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Create new academic year API call
export const createAcademicYear = async (
  token: string,
  name: string,
  yearValue: number,
  institution: string,
  degreeProgram: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      `${ENDPOINT.ACADEMIC_YEAR.GET_ALL}`,
      {
        name,
        yearValue,
        institution,
        degreeProgram,
      },
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Delete single academic year API call
export const deleteSingleAcademicYear = async (
  token: string,
  userId: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.delete(
      `${ENDPOINT.ACADEMIC_YEAR.GET_WITH_ID(userId)}`,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
