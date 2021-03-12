import { API_URL } from "./apiConfig";

export const fetchImageData = async () => {
  const userToken = localStorage.getItem("userToken");

  try {
    return await axios({
      method: "get",
      url: `${API_URL}images/`,
    });
    return response;
  } catch (error) {}
};

/* headers: {
  Authorization: "Token " + userToken,
}, */
