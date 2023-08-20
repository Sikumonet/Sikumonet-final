import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";

// Get all downloads details API call
export const getAllDownloads = async () => {
  try {
    const response = await axios.get(`${ENDPOINT.DOWNLOAD.GET_ALL}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get all downloads related to the specific user API call
export const getAllDownloadsRelatedToUser = async (userId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.DOWNLOAD.GET_WITH_USER(userId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get all downloads related to the specific summary API call
export const getAllDownloadsRelatedToSummary = async (summaryId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.DOWNLOAD.GET_WITH_SUMMARY(summaryId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Create new download API call
export const createDownload = async (token: string, summary: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      `${ENDPOINT.DOWNLOAD.GET_ALL}`,
      {
        summary,
      },
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
