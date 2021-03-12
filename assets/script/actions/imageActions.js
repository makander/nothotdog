import { REQUEST_ALL_IMAGES } from "./actionTypes";

export const requestImages = (authenticated = false) => {
  return {
    type: REQUEST_ALL_IMAGES,
  };
};

const requestImage = () => {};

const createImage = () => {};

const editImage = () => {};
