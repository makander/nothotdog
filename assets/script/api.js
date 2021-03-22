import axios from "axios";

const AUTH_URL = "http://localhost:8000/api/auth/";
const IMAGE_API = "http://localhost:8000/api/images/";

const userToken = localStorage.getItem("userToken");

export const fetchUserData = async (payload) => {
  const username = payload.user.username;
  const password = payload.user.password;

  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_URL}login/`,
      data: {
        username,
        password,
      },
    });
    return response.data.key;
  } catch (e) {
    console.log("FETCH DATA ERROR: ", e);
  }
};

export const fetchImageData = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${IMAGE_API}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOneImageData = async (payload) => {
  try {
    const response = await axios({
      method: "get",
      url: `${IMAGE_API}${payload.id}/`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateImage = async ({ form: { description, name, id } }) => {
  if (userToken) {
    axios.defaults.headers.common["Authorization"] = `Token ${userToken}`;
  }

  try {
    const body = {
      name,
      description,
    };

    const updateImage = await axios.put(`${IMAGE_API}${id}/`, body);
    return updateImage.data;
  } catch (error) {
    console.log(error);
  }
};

export const postImageData = async ({ form: { image, description, name } }) => {
  if (userToken) {
    axios.defaults.headers.common["Authorization"] = `Token ${userToken}`;
  }

  try {
    const body = {
      name,
      description,
    };
    const createImageObject = await axios.post(`${IMAGE_API}`, body);

    const newObjectId = createImageObject.data.id;

    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);

    const addImageToObject = await axios.put(
      `${IMAGE_API}${newObjectId}/`,
      formData
    );

    return addImageToObject.data;
    //return response.data;
  } catch (error) {
    console.log(error);
  }
};
