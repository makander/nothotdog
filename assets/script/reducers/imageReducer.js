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
  REQUEST_PREVIOUS_IMAGE_SUCCESS,
  REQUEST_NEXT_IMAGE_SUCCESS,
  CURRENT_IMAGE_RESET_SUCCESS,
  RESET_CURRENT_IMAGE,
  DISPLAY_NEXT_IMAGE,
  DISPLAY_PREVIOUS_IMAGE,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  loading: true,
};

const imageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGES_RECEIVED: {
      return {
        ...state,
        images: action.images,
        ...state,
        loading: false,
      };
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
      return {
        ...state,
        currentImage: action.image,
        ...state,
        loading: false,
      };
    }

    case DISPLAY_NEXT_IMAGE: {
      return { ...state, currentImage: state.nextImage };
    }

    case DISPLAY_PREVIOUS_IMAGE: {
      return { ...state, currentImage: state.previousImage };
    }

    case REQUEST_NEXT_IMAGE_SUCCESS: {
      return { ...state, nextImage: action.image };
    }
    case REQUEST_PREVIOUS_IMAGE_SUCCESS: {
      return { ...state, previousImage: action.image };
    }
    default:
      return state;
  }
};

export default imageReducer;
