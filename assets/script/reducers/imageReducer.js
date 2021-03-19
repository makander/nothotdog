import {
  CREATE_IMAGE,
  REQUEST_IMAGE,
  REQUEST_ALL_IMAGES,
  IMAGES_RECEIVED,
  IMAGES_RECIVED_FAILURE,
  CREATE_IMAGE_SUCCESS,
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const imageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGES_RECEIVED: {
      return { ...state, images: action.images };
    }
    case IMAGES_RECIVED_FAILURE: {
      console.log(action);
      return {
        ...state,
        token: action.payload,
      };
    }
    case CREATE_IMAGE_SUCCESS: {
      console.log(action);
      console.log(state);
      return {
        ...state.images,
        images: action.image,
      };
    }
    default:
      return state;
  }
};

export default imageReducer;
