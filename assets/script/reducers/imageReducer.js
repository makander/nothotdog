import {
  CREATE_IMAGE,
  REQUEST_IMAGE,
  REQUEST_ALL_IMAGES,
  REQUEST_IMAGE_SUCCESS,
  IMAGES_RECEIVED,
  IMAGES_RECIVED_FAILURE,
  CREATE_IMAGE_SUCCESS,
  EDIT_IMAGE,
  EDIT_IMAGE_SUCCESS,
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const imageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGES_RECEIVED: {
      return { ...state, images: action.images };
    }
    case IMAGES_RECIVED_FAILURE: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case CREATE_IMAGE_SUCCESS: {
      return [...state.images, action.image];
    }
    case EDIT_IMAGE_SUCCESS: {
      //return [...state.images, action.image];
    }
    case REQUEST_IMAGE_SUCCESS: {
      return { ...state, currentImage: action.image };
    }
    default:
      return state;
  }
};

export default imageReducer;
