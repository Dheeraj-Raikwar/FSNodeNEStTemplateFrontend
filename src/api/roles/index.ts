import { User } from "@/models/user";
import { api } from "../interceptor";
import { APIResponse } from "@/types/common";
import { API_ERROR_MESSAGE } from "@/constants/common";
import axios from "axios";

export type RolesResponse = {
  Permission?: any;
  name: string,
  alias: string,
  permission: {
    resources: string;
    action: {all: boolean;
        read: boolean;
        write: boolean;};
  }[];
};


export const rolesAPI = async(data: RolesResponse): Promise<APIResponse<RolesResponse>> =>{
  try{
    const response = await api.post('/role',data);
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


export const getRoles = async(take: string, skip: string): Promise<APIResponse<RolesResponse[]>> =>{
    try{
      const response = await api.get(`/role/?take=${take}&skip=${skip}`);
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

export const editRoleAPI = async(id:string,data: any): Promise<APIResponse<RolesResponse>> =>{
    try{
      const response = await api.patch(`/role/${id}`,data);
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




