import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { formReducer, mainReducer } from "./reducers";

const reducer = combineReducers({
  form: formReducer,
  main: mainReducer
});

let middleware = compose(applyMiddleware(thunk, logger));
const store = createStore(reducer, middleware);

export default store;
