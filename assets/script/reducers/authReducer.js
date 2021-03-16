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
        ...state.authenticated,
        authenticated: true,
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
