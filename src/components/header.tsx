import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar } from "@material-ui/core";
import { authRef, appsRef, authProvider, persistance } from "../configFirebase";
import { connect } from "react-redux";
import { getUser } from "../redux/actions";
interface IProps {
  isLogged: boolean;
  currentUser: firebase.User;
  getUser: Function;
}
interface IHeaderState {
  anchorEl: HTMLButtonElement;
}
class Header extends React.Component<IProps, IHeaderState> {
  constructor(props: IProps) {
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
    return authRef.onAuthStateChanged((user: firebase.User) => {
      if (user) {
        appsRef
          .child(user.uid)
          .on("value", (snapshot: firebase.database.DataSnapshot) => {
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
    authRef.setPersistence(persistance).then(() => {
      authRef.signInWithPopup(authProvider);
    });
  };
  componentDidMount() {
    this.monitorAuth();
  }
  closeAnchorEl = () => {
    this.setState({ anchorEl: null });
  };
  setAnchorEl = (event: React.MouseEvent<HTMLButtonElement>) => {
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
const mapsDispatchToProps = {
  getUser
};
export const mapsStateToProps = (state: any) => {
  return {
    isLogged: state.main.isLogged,
    currentUser: state.main.currentUser
  };
};
export default connect(mapsStateToProps, mapsDispatchToProps)(Header);
