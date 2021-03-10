import { LOGGED_IN, LOGGED_OUT } from "../actionTypes";

const INITIAL_STATE = [{ token: "" }];

const authReducer = (state = INITIAL_STATE, action) => {
  console.log("before switch");
  switch (action.type) {
    case LOGGED_IN: {
      console.log("in the reducer");
      console.log(action);
      return {
        ...state,
        token: action.payload,
      };
    }
    case LOGGED_OUT: {
      return {
        ...state,
        INITIAL_STATE,
      };
    }
    default:
      return state;
  }
};

export default authReducer;