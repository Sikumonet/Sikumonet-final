import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";

// Get all feedbacks details API call
export const getAllFeedbacks = async () => {
  try {
    const response = await axios.get(`${ENDPOINT.FEEDBACK.GET_ALL}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get all feedbacks related to the specific summary API call
export const getAllFeedbacksRelatedToSummary = async (summaryId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.FEEDBACK.GET_WITH_SUMMARY(summaryId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get single feedback details API call
export const getSingleFeedback = async (feedbackId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.FEEDBACK.GET_WITH_ID(feedbackId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Create new feedback API call
export const createFeedback = async (
  token: string,
  content: string,
  summary?: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      `${ENDPOINT.FEEDBACK.GET_ALL}`,
      {
        content,
        summary,
      },
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Delete single feedback API call
export const deleteSingleFeedback = async (
  token: string,
  feedbackId: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.delete(
      `${ENDPOINT.FEEDBACK.GET_WITH_ID(feedbackId)}`,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
