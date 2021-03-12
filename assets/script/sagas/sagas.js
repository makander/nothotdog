import { call, put, takeLatest, all, take } from "redux-saga/effects";
import { fetchUserData, fetchImageData } from "../api";

export function* fetchUser(payload) {
  try {
    console.log("FETCH USER");
    const token = yield call(fetchUserData, payload);
    localStorage.setItem("userToken", token);
    yield put({ type: "LOGIN_SUCCESS" });
  } catch (error) {
    yield put({ type: "LOGIN_FAILED", error });
  }
}

export function* fetchImages() {
  try {
    console.log("RUNNING FETCH IMAGES");
    const images = yield call(fetchImageData);
    console.log(images);
    yield put({ type: "IMAGES_RECEIVED", images });
  } catch (error) {}
}

export default function* rootSaga() {
  yield takeLatest("LOGIN_REQUEST", fetchUser);
  yield takeLatest("REQUEST_ALL_IMAGES", fetchImages);
}
