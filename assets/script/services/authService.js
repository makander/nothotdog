import axios from "axios";

const getUser = async (data) => {
  axios.post(`http://localhost:8080/api/auth/login/`, data);
};
