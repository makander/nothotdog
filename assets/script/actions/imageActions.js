import { REQUEST_ALL_IMAGES, CREATE_IMAGE_REQUEST } from "./actionTypes";

export const requestImages = () => {
  console.log("IMAGE ACTION");
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

const editImage = () => {};
