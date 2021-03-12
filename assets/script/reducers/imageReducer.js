import {
  CREATE_IMAGE,
  REQUEST_IMAGE,
  REQUEST_ALL_IMAGES,
  IMAGES_RECEIVED,
  IMAGES_RECIVED_FAILURE,
  CREATE_IMAGE_SUCCESS,
} from "../actions/actionTypes";

const INITIAL_STATE = [{ images: null }];

const imageReducer = (state = INITIAL_STATE, action) => {
  console.log("IMAGE REDUCER RUNNING");
  switch (action.type) {
    case IMAGES_RECEIVED: {
      console.log(action);
      return {
        ...state,
        images: action.payload,
      };
    }
    case IMAGES_RECIVED_FAILURE: {
      console.log(action);
      return {
        ...state,
        token: action.payload,
      };
    }
    case CREATE_IMAGE_SUCCESS: {
      return {
        ...state,
        INITIAL_STATE,
      };
    }
    default:
      return state;
  }
};

export default imageReducer;
