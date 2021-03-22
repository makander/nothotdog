import { LOGIN_REQUEST, REQUEST_LOGOUT } from "./actionTypes";

export const loginUser = (user) => {
  return {
    type: LOGIN_REQUEST,
    user,
  };
};
export const logoutUser = () => {
  return {
    type: REQUEST_LOGOUT,
  };
};
