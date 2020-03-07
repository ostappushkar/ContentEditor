import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import * as firebase from "firebase/app";
import { IProps } from "../App";
import { Avatar } from "@material-ui/core";
import { authRef, appsRef } from "../config";
import { connect } from "react-redux";
import { mapsDispatchToProps, mapsStateToProps } from "../redux/store";

interface IHeaderState {
  anchorEl: any;
}
class Header extends React.Component<IProps, IHeaderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }
  handleLogout = () => {
    authRef.signOut().then(() => {
      localStorage.clear();
      this.closeAnchorEl();
      console.log("Logged out...");
    });
  };
  monitorAuth = () => {
    return authRef.onAuthStateChanged((user: any) => {
      if (user) {
        appsRef.child(user.uid).on("value", (snapshot: any) => {
          let appsSnaphot = snapshot.val();
          let appsArr = [];
          for (let item in appsSnaphot) {
            appsArr.push({
              id: item,
              appName: appsSnaphot[item].appName,
              appColor: appsSnaphot[item].appColor,
              appImage: appsSnaphot[item].appImage,
              appDescription: appsSnaphot[item].appDescription,
              appLocation: appsSnaphot[item].appLocation,
              appCategories: appsSnaphot[item].appCategories,
              appGPS: appsSnaphot[item].appGPS
            });
          }
          this.props.getUser(true, user, appsArr);
        });
      } else {
        this.props.getUser(false, null, []);
      }
    });
  };
  handleLogin = () => {
    authRef.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      authRef.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    });
  };
  componentDidMount() {
    this.monitorAuth();
  }
  closeAnchorEl = () => {
    this.setState({ anchorEl: null });
  };
  setAnchorEl = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  render() {
    if (this.props.isLogged) {
      return (
        <AppBar color="primary" position="static">
          <Toolbar>
            <Button
              className="avatarBtn"
              aria-controls="logout-menu"
              aria-haspopup="true"
              onClick={this.setAnchorEl}
            >
              <Avatar src={this.props.currentUser.photoURL} />
            </Button>

            <Menu
              id="logout-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.closeAnchorEl}
            >
              <MenuItem>{this.props.currentUser.displayName}</MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      );
    } else {
      return (
        <AppBar color="primary" position="static">
          <Toolbar>
            <Button onClick={this.handleLogin} color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      );
    }
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Header);
