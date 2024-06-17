import { User } from "@/models/user";
import { api } from "../interceptor";
import { APIResponse } from "@/types/common";
import { API_ERROR_MESSAGE } from "@/constants/common";
import axios from "axios";

export type Forgot = {
  email: string,
};

type ForgotResponse = {
  token: string,
  user: User
}

export const forgotAPI = async(data: Forgot): Promise<APIResponse<ForgotResponse>> =>{
  try{
    const response = await api.post('/auth/forgot-password',data);
    const responseData = response.data;
    if (responseData.success === true){
      return responseData;
    }
    return {
      success: false,
      message: responseData?.message
    }
  }
  catch(e){
    return {
      success: false,
      message: API_ERROR_MESSAGE
    }
  }
}


