import { call, put, takeLatest, all, take } from "redux-saga/effects";
import { fetchUserData, fetchImageData, postImageData } from "../api";

export function* fetchUser(payload) {
  try {
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
  } catch (error) {
    console.log(error);
  }
}

export function* createImage(form) {
  console.log("creating images");
  try {
    console.log(form);
    const newImg = yield call(postImageData, form);
    console.log(newImg);
    yield put({ type: "CREATE_IMAGE_SUCCESS" });
  } catch (error) {
    //yield put({ type: "CREATE_IMAGE_FAILED", error });
    console.log(error);
  }
}

export default function* rootSaga() {
  yield takeLatest("LOGIN_REQUEST", fetchUser);
  yield takeLatest("REQUEST_ALL_IMAGES", fetchImages);
  yield takeLatest("CREATE_IMAGE_REQUEST", createImage);
}
