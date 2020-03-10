import { AppItem } from "../App";
import { reducer as reduxFormReducer } from "redux-form";
import { actionTypes } from "./actionTypes";
export const formReducer = reduxFormReducer.plugin({
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
});
const initialState = {
  isLogged: false,
  currentUser: {},
  modalOpen: false,
  apps: [] as AppItem[],
  isEditing: false,
  appItem: {}
};

export const mainReducer = (state = initialState, action: any) => {
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
