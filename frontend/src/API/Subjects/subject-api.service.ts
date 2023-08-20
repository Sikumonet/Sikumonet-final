import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";

// Get all subjects details API call
export const getAllSubjects = async () => {
  try {
    const response = await axios.get(`${ENDPOINT.SUBJECT.GET_ALL}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get all academic years related to the specific degree program details API call
export const getAllSubjectsRelatedToAcademicYear = async (
  academicYearId: string
) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.SUBJECT.GET_WITH_ACADEMIC_YEAR(academicYearId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get single subject details API call
export const getSingleSubject = async (userId: string) => {
  try {
    const response = await axios.get(`${ENDPOINT.SUBJECT.GET_WITH_ID(userId)}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Create new subject API call
export const createSubject = async (
  token: string,
  name: string,
  institution: string,
  degreeProgram: string,
  academicYear: string,
  imageFile: any
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      `${ENDPOINT.SUBJECT.GET_ALL}`,
      {
        name,
        institution,
        degreeProgram,
        academicYear,
        imageFile,
      },
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Delete single subject API call
export const deleteSingleSubject = async (token: string, userId: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.delete(
      `${ENDPOINT.SUBJECT.GET_WITH_ID(userId)}`,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
