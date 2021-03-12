import { API_URL } from "./apiConfig";

export const fetchImageData = async () => {
  const userToken = localStorage.getItem("userToken");
  console.log("INSIDE FETCHIMAGEDATA");
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}images/`,
    });
    console.log("these are images", response);
  } catch (error) {}
};

/* headers: {
  Authorization: "Token " + userToken,
}, */
