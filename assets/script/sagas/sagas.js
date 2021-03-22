import { call, put, takeLatest, all, take } from "redux-saga/effects";
import {
  fetchUserData,
  fetchImageData,
  postImageData,
  fetchOneImageData,
  updateImage,
  fetchNext,
  fetchPrevious,
} from "../api";
import history from "../history";

import {
  REQUEST_ALL_IMAGES,
  REQUEST_IMAGE,
  CREATE_IMAGE_REQUEST,
  LOGIN_REQUEST,
  EDIT_IMAGE_SUCCESS,
  REQUEST_LOGOUT,
  LOGOUT_SUCCESS,
  CREATE_IMAGE_SUCCESS,
  REQUEST_IMAGE_SUCCESS,
  IMAGES_RECEIVED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REQUEST_IMAGE_EDIT,
  REQUEST_NEXT_IMAGE,
  REQUEST_PREVIOUS_IMAGE,
} from "../actions/actionTypes";

export function* fetchUser(payload) {
  try {
    const token = yield call(fetchUserData, payload);
    localStorage.setItem("userToken", token);
    yield put({ type: LOGIN_SUCCESS });
    history.push("/profile");
  } catch (error) {
    yield put({ type: LOGIN_FAILED, error });
  }
}

export function* fetchImages() {
  try {
    const images = yield call(fetchImageData);
    yield put({ type: IMAGES_RECEIVED, images });
  } catch (error) {
    console.log(error);
  }
}
export function* fetchImage(payload) {
  try {
    const image = yield call(fetchOneImageData, payload);
    yield put({ type: REQUEST_IMAGE_SUCCESS, image });
  } catch (error) {
    console.log(error);
  }
}
export function* fetchNextImage(payload) {
  try {
    const image = yield call(fetchNext, payload);
    yield put({ type: REQUEST_IMAGE_SUCCESS, image });
  } catch (error) {
    console.log(error);
  }
}
export function* fetchPreviousImage(payload) {
  try {
    const image = yield call(fetchPrevious, payload);
    yield put({ type: REQUEST_IMAGE_SUCCESS, image });
  } catch (error) {
    console.log(error);
  }
}

export function* createImage(form) {
  try {
    const image = yield call(postImageData, form);

    yield put({ type: CREATE_IMAGE_SUCCESS, image });
  } catch (error) {
    //yield put({ type: "CREATE_IMAGE_FAILED", error });
    console.log(error);
  }
}
export function* editImage(payload) {
  try {
    const updated = yield call(updateImage, payload);
    yield put({ type: EDIT_IMAGE_SUCCESS });
    history.push(`/images/${payload.form.id}`);
  } catch (error) {
    yield put({ type: "", error });
    console.log(error);
  }
}

export function* removeToken() {
  try {
    localStorage.setItem("userToken", "");
    yield put({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, fetchUser);
  yield takeLatest(REQUEST_ALL_IMAGES, fetchImages);
  yield takeLatest(CREATE_IMAGE_REQUEST, createImage);
  yield takeLatest(REQUEST_IMAGE, fetchImage);
  yield takeLatest(REQUEST_NEXT_IMAGE, fetchNextImage);
  yield takeLatest(REQUEST_PREVIOUS_IMAGE, fetchPreviousImage);
  yield takeLatest(REQUEST_LOGOUT, removeToken);
  yield takeLatest(REQUEST_IMAGE_EDIT, editImage);
}
