import axios from "axios";

const AUTH_URL = "http://localhost:8000/api/auth/";
const IMAGE_API = "http://localhost:8000/api/images/";

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

  try {
    const body = {
      name,
      description,
    };
    const createImageObject = await axios.post(`${IMAGE_API}`, body);

    const newObjectId = createImageObject.data.id;

    console.log(createImageObject);
    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);

    const addImageToObject = await axios.put(
      `${IMAGE_API}${newObjectId}/`,
      formData
    );

    console.log(addImageToObject);
    //return response.data;
  } catch (error) {
    console.log(error);
  }
};
