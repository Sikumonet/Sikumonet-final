import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";

// Get all admin statistics API call
export const getAdminStatistics = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(
      `${ENDPOINT.STATISTICS.GET_ADMIN}`,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get all user statistics API call
export const getUserStatistics = async (token: string) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(
        `${ENDPOINT.STATISTICS.GET_USER}`,
        config
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.response.data.message };
    }
  };
