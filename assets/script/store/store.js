import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import createSagaMiddleware from "redux-saga";
import imageReducer from "../reducers/imageReducer";
//import rootReducer
import rootSaga from "../sagas/sagas";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  user: authReducer,
  images: imageReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);
//);
export default store;

sagaMiddleware.run(rootSaga);
