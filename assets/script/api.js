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
  const userToken = localStorage.getItem("userToken");
  console.log("INSIDE FETCHIMAGEDATA");
  try {
    const response = await axios({
      method: "get",
      url: `${IMAGE_API}`,
    });
    console.log("these are images", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
