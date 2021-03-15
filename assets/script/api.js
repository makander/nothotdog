import axios from "axios";

const AUTH_URL = "http://localhost:8080/api/auth/";
const IMAGE_API = "http://localhost:8080/api/images/";

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

export const postImageData = async ({ form: { image, description, name } }) => {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    axios.defaults.headers.common["Authorization"] = `Token ${userToken}`;
  }

  console.log(image);

  const body = {
    name,
    description,
  };

  const imgData = {
    image,
  };

  try {
    const createImageObject = await axios.post(
      "http://localhost:8080/api/images/",
      body
    );

    createImageObject.console.log(createImageObject);
    //return response.data;
  } catch (error) {
    console.log(error);
  }
};
