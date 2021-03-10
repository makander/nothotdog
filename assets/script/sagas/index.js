import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

export function* fetchUser(username, password) {
  try {
    console.log("is it running");
    const data = yield call(fetchData, username, password);
    console.log(data);
    const key = data.data.key;

    yield put({ type: "LOGGED_IN", key });
  } catch (error) {
    yield put({ type: "FETCH_FAILED", error });
  }
}

const fetchData = async (username, password) => {
  try {
    let username = "göran";
    let password = "1abc1abc";

    console.log("fetching?");
    return await axios({
      method: "post",
      url: "http://localhost:8080/api/auth/login/",
      data: {
        username,
        password,
      },
    });
  } catch (e) {
    console.log("FETCH DATA ERROR: ", e);
  }
};

export function* getUser() {
  console.log("this be runnings");
  yield* takeLatest("LOGGED_IN", fetchUser);
}

/* export default function* rootSaga() {
  yield all([getUser(), fetchUser()]);
}
 */
