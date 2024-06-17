import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { getCookie } from 'cookies-next';


const isServer = () => {
  return typeof window === "undefined";
}

let accessToken = "";
let context: GetServerSidePropsContext = <GetServerSidePropsContext>{};
const baseURL = process.env.BACKEND_URL;

export const setAccessToken = (_accessToken: string) => {
  accessToken = _accessToken
}

export const getAccessToken = () => (accessToken)

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
}

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use((config) => {
  if (!isServer()) {
    config.headers.Authorization = `Bearer ${getCookie('token')}`
  }

  if (isServer() && context?.req?.cookies) {
    config.headers.Authorization = `Bearer ${getCookie('token',context)}`;
  }
  return config;
});


