import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import logger from "redux-logger";
import thunk from "redux-thunk";

const actionTypes = {
  GET_USER: "getUser",
  TOGGLE_MODAL: "toggleModal",
  SET_EDITING: "setEditing",
  SET_VALUES: "setValues"
};

const initialState = {
  isLogged: false,
  currentUser: {},
  modalOpen: false,
  apps: [],
  isEditing: false,
  appItem: {}
};

const mainReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        isLogged: action.payload.isLogged,
        currentUser: action.payload.currentUser,
        apps: action.payload.apps
      };
    case actionTypes.TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: action.payload.modalOpen
      };
    case actionTypes.SET_EDITING:
      return {
        ...state,
        isEditing: action.payload.isEditing,
        appItem: action.payload.appItem
      };
    default:
      return {
        ...state
      };
  }
};
const toggleModal = (modalOpen: boolean) => {
  return {
    type: "toggleModal",
    payload: { modalOpen: modalOpen }
  };
};
const getUser = (isLogged: boolean, currentUser: any, apps: any) => {
  return {
    type: "getUser",
    payload: { isLogged: isLogged, currentUser: currentUser, apps: apps }
  };
};
const setEditing = (isEditing: boolean, appItem: any) => {
  return {
    type: "setEditing",
    payload: { isEditing: isEditing, appItem: appItem }
  };
};
const setValues = (values: any, initial: any) => {
  return {
    type: "setValues",
    payload: { values: values, initial: initial }
  };
};
const reducer = combineReducers({
  form: reduxFormReducer.plugin({
    addAppForm: (state: any, action: any) => {
      switch (action.type) {
        case actionTypes.SET_VALUES:
          return {
            ...state,
            values: action.payload.values,
            initial: action.payload.initial
          };
        default:
          return state;
      }
    }
  }),
  main: mainReducer
});
export const mapsDispatchToProps = {
  getUser,
  toggleModal,
  setEditing,
  setValues
};
export const mapsStateToProps = (state: any) => {
  return {
    isLogged: state.main.isLogged,
    currentUser: state.main.currentUser,
    modalOpen: state.main.modalOpen,
    apps: state.main.apps,
    isEditing: state.main.isEditing,
    appItem: state.main.appItem
  };
};
let middleware = compose(applyMiddleware(thunk, logger));
const store = createStore(reducer, middleware);

export default store;
