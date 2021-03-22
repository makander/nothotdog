import {
  REQUEST_ALL_IMAGES,
  CREATE_IMAGE_REQUEST,
  REQUEST_IMAGE,
  REQUEST_IMAGE_EDIT,
} from "./actionTypes";

export const requestImages = () => {
  return {
    type: REQUEST_ALL_IMAGES,
  };
};

export const createImageRequest = (form) => {
  return {
    type: CREATE_IMAGE_REQUEST,
    form,
  };
};

export const requestImage = (id) => {
  return {
    type: REQUEST_IMAGE,
    id,
  };
};

export const editImage = (form) => {
  return {
    type: REQUEST_IMAGE_EDIT,
    form,
  };
};
