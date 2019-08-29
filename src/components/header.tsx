import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";
import firebase from "firebase/app";
import { Avatar } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const [userName, setName] = React.useState("");
  const [userPhoto, setPhoto] = React.useState("");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var userData = JSON.stringify(user);
      setName(JSON.parse(userData).displayName);
      setPhoto(JSON.parse(userData).photoURL);
    } else {
      setName("");
      setPhoto("");
    }
  });
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IfFirebaseAuthed>
            {() => {
              return (
                <div className="header-items">
                  <div className="userInfo">
                    <Typography variant="button">{userName}</Typography>
                    <Avatar src={userPhoto}></Avatar>
                  </div>
                  <Button
                    onClick={() => {
                      firebase.auth().signOut();
                    }}
                    color="inherit"
                  >
                    Log out
                  </Button>
                </div>
              );
            }}
          </IfFirebaseAuthed>
          <IfFirebaseUnAuthed>
            {() => {
              return (
                <div>
                  <Button
                    onClick={() => {
                      var provider = new firebase.auth.GoogleAuthProvider();
                      firebase.auth().signInWithPopup(provider);
                    }}
                    color="inherit"
                  >
                    Login
                  </Button>
                </div>
              );
            }}
          </IfFirebaseUnAuthed>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
