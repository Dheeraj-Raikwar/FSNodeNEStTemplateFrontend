import { User } from "@/models/user";
import { api } from "../interceptor";
import { APIResponse } from "@/types/common";
import { API_ERROR_MESSAGE } from "@/constants/common";
import axios from "axios";

export type Login = {
  username: string,
  password: string
};

type LoginResponse = {
  token: string,
  user: User
}

export const loginAPI = async(data: Login): Promise<APIResponse<LoginResponse>> =>{
  try{
    const response = await api.post('/auth/login',data);
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

export const clearSession = async(data: string[]): Promise<APIResponse<LoginResponse>> =>{
  try{
    const response = await api.post('/auth/clear-session',data);
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


export const verifyO365Token = async(res: any): Promise<APIResponse<LoginResponse>> =>{
  try{
    const response = await api.post('auth/aad/validate-token',res);
    const responseData = response.data;
    if (responseData.success === true){
      return {
        success: true,
        data: {token:responseData.data.token, user:responseData.data.user}
      }
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