import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";

// Get all ratings details API call
export const getAllRatings = async () => {
  try {
    const response = await axios.get(`${ENDPOINT.RATING.GET_ALL}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get all ratings related to the specific summary API call
export const getAllRatingsRelatedToSummary = async (summaryId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.RATING.GET_WITH_SUMMARY(summaryId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get single rating details API call
export const getSingleRating = async (userId: string) => {
  try {
    const response = await axios.get(`${ENDPOINT.RATING.GET_WITH_ID(userId)}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Create new rating API call
export const createRating = async (
  token: string,
  rating: number,
  summary?: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      `${ENDPOINT.RATING.GET_ALL}`,
      {
        rating,
        summary,
      },
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Delete single rating API call
export const deleteSingleRating = async (token: string, userId: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.delete(
      `${ENDPOINT.RATING.GET_WITH_ID(userId)}`,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
