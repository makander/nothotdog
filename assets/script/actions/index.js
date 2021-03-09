import { LOGGED_IN, LOGGED_OUT } from "../actionTypes";

export const loginUser = (user) => {
  console.log("we are runnnig");
  console.log(user);
  return {
    type: LOGGED_IN,
    payload: user,
  };
};
const logout = () => {
  return {
    type: LOGGED_OUT,
  };
};
