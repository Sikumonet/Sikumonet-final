import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";

// Get all libraries related to the specific user API call
export const getAllLibrariesRelatedToUser = async (userId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.LIBRARY.GET_WITH_USER(userId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Create new library API call
export const createLibrary = async (token: string, subject: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      `${ENDPOINT.LIBRARY.GET_ALL}`,
      {
        subject,
      },
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Delete single library API call
export const deleteSingleLibrary = async (token: string, libraryId: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.delete(
      `${ENDPOINT.LIBRARY.GET_WITH_ID(libraryId)}`,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
