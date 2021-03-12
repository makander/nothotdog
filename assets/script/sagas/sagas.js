import { call, put, takeLatest, all, take } from "redux-saga/effects";
import { fetchUserData } from "../services/authService";
import { fetchImageData } from "../services/imageService";

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
    const images = yield call(fetchImageData);
    console.log(images);
  } catch (error) {}
}

export default function* rootSaga() {
  yield takeLatest("LOGIN_REQUEST", fetchUser);
  yield takeLatest("REQUEST_ALL_IMAGES", fetchImages);
}
