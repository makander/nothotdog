import {
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actionTypes";

const INITIAL_STATE = [{ token: "" }];

const authReducer = (state = INITIAL_STATE, action) => {
  console.log("before switch");
  switch (action.type) {
    case LOGIN_SUCCESS: {
      console.log(action);
      return {
        ...state,
        token: action.payload,
      };
    }
    case LOGIN_FAILED: {
      console.log(action);
      return {
        ...state,
        token: action.payload,
      };
    }
    case LOGOUT_SUCCESS: {
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
