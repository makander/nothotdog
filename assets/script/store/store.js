import { createStore, applyMiddleware, compose } from "redux";
import authReducer from "../reducers/authReducer";
import createSagaMiddleware from "redux-saga";
//import rootReducer
import { getUser } from "../sagas";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  authReducer,
  composeEnhancer(applyMiddleware(sagaMiddleWare))
);
//);
export default store;

sagaMiddleWare.run(getUser);
