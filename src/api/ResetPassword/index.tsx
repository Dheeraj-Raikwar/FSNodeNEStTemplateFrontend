import { User } from "@/models/user";
import { api } from "../interceptor";
import { APIResponse } from "@/types/common";
import { API_ERROR_MESSAGE } from "@/constants/common";
import axios from "axios";

export type ResetPassword = {
  confirmPassword: string,
  newPassword:string,
  token: string | string[] | undefined
};

type ForgotResponse = {
  token: string,
  user: User,
  message: string
}

export const resetPasswordAPI = async(data: ResetPassword): Promise<APIResponse<ForgotResponse>> =>{
  try{
    const response = await api.post(`/auth/forgot-password/edit?token=${data.token}`,data);
    const responseData = response.data;
    if (responseData.success === true){
      return responseData;
    }
    return {
      success: false,
      message: responseData?.message??API_ERROR_MESSAGE
    }
  }
  catch(e){
    return {
      success: false,
      message: API_ERROR_MESSAGE
    }
  }
}


