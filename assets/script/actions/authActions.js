import { LOGGED_OUT, LOGIN_REQUEST } from "./actionTypes";

export const loginUser = (user) => {
  return {
    type: LOGIN_REQUEST,
    user,
  };
};
const logoutUser = () => {
  return {
    type: LOGGED_OUT,
  };
};
