import { call, put, takeLatest, all } from "redux-saga/effects";
import { LOGGED_IN, LOGGED_OUT, LOGIN_REQUEST } from "../actions/actionTypes";

import axios from "axios";

export function* fetchUser(data) {
  try {
    console.log("FETCH USER");
    console.log(data);
    const data = yield call(fetchData, username, password);
    console.log("This is data inside fetchUser", data);
    const key = data.data.key;

    yield put({ type: "LOGIN_SUCCESS", key });
  } catch (error) {
    yield put({ type: "LOGIN_FAILED", error });
  }
}

const fetchData = async (username, password) => {
  try {
    console.log("FETCH DATA");
    console.log("USERNAME IN FETCHDATA: ", username, password);
    const data = await axios({
      method: "post",
      url: "http://localhost:8080/api/auth/login/",
      data: {
        username,
        password,
      },
    });
    let resolved = await data;
    console.log("this is resovled data in fetchData", resolved);
    return resolved.data.key;
  } catch (e) {
    console.log("FETCH DATA ERROR: ", e);
  }
};

export default function* rootSaga() {
  yield takeLatest("LOGIN_REQUEST", fetchUser);
}
