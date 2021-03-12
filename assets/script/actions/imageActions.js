import { REQUEST_ALL_IMAGES } from "./actionTypes";

export const requestImages = (authenticated = false) => {
  console.log("IMAGE ACTION");
  return {
    type: REQUEST_ALL_IMAGES,
  };
};

const requestImage = () => {};

const createImage = () => {};

const editImage = () => {};
