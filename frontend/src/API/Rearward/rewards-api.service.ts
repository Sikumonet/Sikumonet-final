import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";
import { IRearwardData } from "../../common/types/reawards-data.interface";

// Get all rearward related to the specific user API call
export const getRearwardRelatedToUser = async (userId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.REARWARD.GET_WITH_USER(userId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
