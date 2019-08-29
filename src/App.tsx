import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { config } from "./config";
import { useRoutes } from "hookrouter";
import routes from "./router";
import Header from "./components/header";
import "./App.css";

const App: React.FC = () => {
  const routesResult = useRoutes(routes);
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div className="App">
        <Header />
        {routesResult}
      </div>
    </FirebaseAuthProvider>
  );
};

export default App;
