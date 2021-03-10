import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchUser(username, password) {
  try {
    console.log("is it running");
    const data = yield call(fetchData, username, password);

    yield put({ type: "LOGGED_IN", data });
  } catch (error) {
    yield put({ type: "FETCH_FAILED", error });
  }
}

const fetchData = async (username, password) => {
  try {
    console.log("fetching?");
    const data = await axios({
      method: "post",
      url: "http://localhost:8080/api/auth/login/",
      data: {
        username,
        password,
      },
    });
    return data;
  } catch (e) {
    console.log("FETCH DATA ERROR: ", e);
  }
};

export function* getUser() {
  yield takeLatest("LOGGED_IN", fetchUser);
}
