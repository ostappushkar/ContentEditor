import React from "react";
import Header from "./components/header";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Dashboard from "./components/dashboard";

export interface IProps {
  isLogged: boolean;
  currentUser: any;
  getUser: any;
  modalOpen: boolean;
  toggleModal: any;
  apps: any;
  isEditing: any;
  setEditing: any;
  setValues: any;
}
class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Dashboard />
          <Alert stack={{ limit: 3 }} />
        </div>
      </Provider>
    );
  }
}

export default App;
