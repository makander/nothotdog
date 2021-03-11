import { createStore, applyMiddleware, compose } from "redux";
import authReducer from "../reducers/authReducer";
import createSagaMiddleware from "redux-saga";
//import rootReducer
import rootSaga from "../sagas";
import getUser from "../sagas";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  authReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);
//);
export default store;

sagaMiddleware.run(rootSaga);
