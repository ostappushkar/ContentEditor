import React from "react";
import Header from "./components/header";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Dashboard from "./components/dashboard";

export interface AppLocation {
  lng: number;
  lat: number;
  address: string;
}
export interface AppItem {
  id?: string;
  appName: string;
  appColor: string;
  appImage: string;
  appDescription: string;
  appLocation: AppLocation;
  appCategories: boolean;
  appGPS: boolean;
}
export interface IProps {
  isLogged: boolean;
  currentUser: firebase.User;
  getUser: Function;
  modalOpen: boolean;
  toggleModal: Function;
  apps: Object[];
  isEditing: boolean;
  setEditing: Function;
  appItem?: AppItem;
  setValues: Function;
}
class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Dashboard />
        <Alert stack={{ limit: 3 }} />
      </Provider>
    );
  }
}
export default App;
