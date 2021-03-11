import { LOGGED_IN, LOGGED_OUT, LOGIN_REQUEST } from "./actionTypes";

export const loginUser = (user) => {
  console.log("USER IN LOGIN REQUEST", user);
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
