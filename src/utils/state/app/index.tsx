
import { Permission, User } from "@/models/user";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import React, { createContext, useReducer, ReactNode, Reducer, useEffect } from "react";

interface State {
  isLoggedIn: boolean;
  isAppLoading: boolean;
  user: User | undefined;
  token: string | undefined;
  permission: Permission | undefined
}

const actionTypes = {
  SET_LOGIN_TRUE: "SET_LOGIN_TRUE",
  SET_LOGIN_FALSE: "SET_LOGIN_FALSE",
  SET_LOADING_TRUE: "SET_LOADING_TRUE",
  SET_LOADING_FALSE: "SET_LOADING_FALSE",
  SET_USER: "SET_USER",
  DELETE_USER: "DELETE_USER",
  SET_USER_COOKIE: "SET_USER_COOKIE",
  DELETE_USER_COOKIE: "DELETE_USER_COOKIE",
  SET_TOKEN_COOKIE: "SET_TOKEN_COOKIE",
  DELETE_TOKEN_COOKIE: "DELETE_TOKEN_COOKIE",
  SET_USER_PERMISSION: "SET_USER_PERMISSION"
} as const;

type ActionType = typeof actionTypes;

type Action =
  { type: ActionType["SET_LOGIN_TRUE"]; } |
  { type: ActionType["SET_LOGIN_FALSE"]; } |
  { type: ActionType["SET_LOADING_TRUE"]; } |
  { type: ActionType["SET_LOADING_FALSE"]; } |
  { type: ActionType["SET_USER"], payload: User; } |
  { type: ActionType["DELETE_USER"]; } |
  { type: ActionType["SET_USER_COOKIE"], payload: User; } |
  { type: ActionType["DELETE_USER_COOKIE"] } |
  { type: ActionType["SET_TOKEN_COOKIE"], payload: string; } |
  { type: ActionType["DELETE_TOKEN_COOKIE"] } |
  { type: ActionType["SET_USER_PERMISSION"], payload: Permission; }

const initialState: State = {
  isLoggedIn: false,
  isAppLoading: false,
  user: undefined,
  token: undefined,
  permission: undefined
};

const reducer: Reducer<State, Action> = (state, action) => {

  switch (action.type) {
    case actionTypes.SET_LOGIN_TRUE:
      return { ...state, isLoggedIn: true };
    case actionTypes.SET_LOGIN_FALSE:
      return { ...state, isLoggedIn: false };
    case actionTypes.SET_LOADING_TRUE:
      return { ...state, isAppLoading: true };
    case actionTypes.SET_LOADING_FALSE:
      return { ...state, isAppLoading: false };
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    case actionTypes.DELETE_USER:
      return { ...state, user: undefined };
    case actionTypes.SET_USER_COOKIE:
      setCookie('user', action.payload, {
        maxAge: 3600, // Example: set the cookie to expire in 1 hour (3600 seconds)
        path: '/', // Path where the cookie is valid
        sameSite: 'strict', // Ensure the cookie is not sent in cross-site requests
        secure: process.env.NODE_ENV === 'production', // Only send the cookie over HTTPS in production
      });
      return state
    case actionTypes.DELETE_USER_COOKIE:
      deleteCookie('user');
      return { ...state, token: undefined };
    case actionTypes.SET_TOKEN_COOKIE:
      setCookie('token', action.payload, {
        maxAge: 3600, // Example: set the cookie to expire in 1 hour (3600 seconds)
        path: '/', // Path where the cookie is valid
        sameSite: 'strict', // Ensure the cookie is not sent in cross-site requests
        secure: process.env.NODE_ENV === 'production', // Only send the cookie over HTTPS in production
      });
      return { ...state, token: action.payload };
     // Other cases...
    case actionTypes.SET_USER_PERMISSION:
      return { ...state, permission: action.payload }; // Set permissions in state
    case actionTypes.DELETE_TOKEN_COOKIE:
      deleteCookie('token',);
  
    default:
      return { ...state, token: undefined };;
  }
};

interface AppContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const AppContext = createContext<AppContextProps>({
  state: initialState,
  dispatch: () => { },
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    dispatch({ type: "SET_USER", payload: JSON.parse(getCookie('user') ?? '{}') ?? undefined })
    if (JSON.parse(getCookie('isloggedin') ?? '{}') === true) {
      dispatch({ type: "SET_LOGIN_TRUE" })
    }

    const userCookie = getCookie('user');
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      const permissions = userData.userRole[0]?.role.Permission
        .map((permission: { resources: string, action: { [key: string]: boolean } }) => ({
          resource: permission.resources,
          actions: permission.action,
        })) || [];

      dispatch({ type: "SET_USER_PERMISSION", payload: permissions });
    }


  }, [])

  return (
    <>
      <AppContext.Provider value={{ state, dispatch }}>
        {children}
      </AppContext.Provider>
    </>
  );
};
