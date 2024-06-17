import { api } from "../interceptor";
import { APIResponse } from "@/types/common";
import { API_ERROR_MESSAGE } from "@/constants/common";
import axios from "axios";
import { stringify } from 'querystring';
import { UserFilter, UserResponse } from "./type";
export type ResetPassword = {
  confirmPassword: string,
  newPassword: string,
  token: string | string[] | undefined
};

export const getUsersAPI = async (filter?: UserFilter): Promise<APIResponse<UserResponse[]>> => {
  try {
    // const queryString = `skip=${filter.skip}&take=${filter.take}&orderBy=${JSON.stringify(filter.orderBy)}`;
    const response = await api.post(`/user/all`, filter);
    const responseData = response.data;
    if (responseData.success === true) {
      return responseData;
    }
    return {
      success: false,
      message: responseData?.message ?? API_ERROR_MESSAGE
    }
  }
  catch (e) {
    return {
      success: false,
      message: API_ERROR_MESSAGE
    }
  }
}

export const getRolesAPI = async (): Promise<APIResponse<UserResponse>> => {
  try {
    const response = await api.get(`/role/all`);
    const responseData = response.data;
    if (responseData.success === true) {
      return responseData;
    }
    return {
      success: false,
      message: responseData?.message ?? API_ERROR_MESSAGE
    }
  }
  catch (e) {
    return {
      success: false,
      message: API_ERROR_MESSAGE
    }
  }
}


export const createUserAPI = async (data: any): Promise<APIResponse<UserResponse>> => {
  try {
    const response = await api.post(`/user`, data);
    const responseData = response.data;
    if (responseData.success === true) {
      return responseData;
    }
    return {
      success: false,
      message: responseData?.message ?? API_ERROR_MESSAGE
    }
  }
  catch (e) {
    return {
      success: false,
      message: API_ERROR_MESSAGE
    }
  }
}

export const editUserAPI = async (id: string, data: any): Promise<APIResponse<UserResponse>> => {
  try {
    const response = await api.patch(`/user/${id}`, data);
    const responseData = response.data;
    if (responseData.success === true) {
      return responseData;
    }
    return {
      success: false,
      message: responseData?.message ?? API_ERROR_MESSAGE
    }
  }
  catch (e) {
    return {
      success: false,
      message: API_ERROR_MESSAGE
    }
  }
}

export const deleteUserAPI = async (id: string): Promise<APIResponse<UserResponse>> => {
  try {
    if (id === "21cfb624-ae93-4268-9914-11db0c5305b3") {
      return {
        success: false,
        message: "This admin account can not be deleted." ?? API_ERROR_MESSAGE
      }
    }
    else {
      const response = await api.delete(`/user/${id}`);
      const responseData = response.data;
      if (responseData.success === true) {
        return responseData;
      }
      return {
        success: false,
        message: responseData?.message ?? API_ERROR_MESSAGE
      }
    }
  }
  catch (e) {
    return {
      success: false,
      message: API_ERROR_MESSAGE
    }
  }
}


