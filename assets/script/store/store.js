import { createStore, applyMiddleware } from "redux";
import authReducer from "../reducers/authReducer";
import createSagaMiddleware from "redux-saga";
//import rootReducer

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  authReducer,
  applyMiddleware(sagaMiddleWare)
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
