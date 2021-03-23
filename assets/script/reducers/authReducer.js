import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actions/actionTypes";

const INITIAL_STATE = { authenticated: false };

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        authenticated: true,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        authenticated: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
