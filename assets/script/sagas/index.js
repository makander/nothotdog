import { call, put } from "redux-saga/effects";

export function* fetchData(action) {
  try {
    const data = yield call(
      axios({
        method: "post",
        url: "http://localhost:8080/api/auth/login/",
        data: {
          username,
          password,
        },
      })
    );
    yield put({ type: "FETCH_SUCEEDED", data });
  } catch (error) {
    yield put({ type: "FETCH_FAILED", error });
  }
}
