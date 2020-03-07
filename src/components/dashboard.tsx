import React from "react";
import { Typography, Fab, Paper, Grid, Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import ModalForm from "./modalForm";
import { connect } from "react-redux";
import Alert from "react-s-alert";
import { mapsStateToProps, mapsDispatchToProps } from "../redux/store";
import { IProps } from "../App";
import { databaseRef } from "../config";

class Dashboard extends React.Component<any, {}> {
  componentDidMount() {
    if (this.props.isLogged) {
    }
  }
  editApp = (appItem: any) => {
    this.props.setEditing(true, appItem);
    this.props.toggleModal(true);
    this.props.setValues(appItem, appItem);
  };
  deleteApp = (appItem: any) => {
    if (window.confirm("Delete this app?")) {
      let appID = appItem.id;
      let userID = this.props.currentUser.uid;
      databaseRef.child(`apps/${userID}/${appID}`).remove(() => {
        Alert.success("App deleted!", {
          position: "bottom-left"
        });
      });
    }
  };
  render() {
    if (this.props.isLogged) {
      return (
        <Container className="dashboard" fixed>
          <div style={{ marginBottom: "20px" }} className="dashboard-header">
            <Typography variant="h6">My Dashboard</Typography>
          </div>
          <div className="dashboard-body">
            {this.props.apps.length <= 0 ? (
              <Typography variant="h5">You have no apps yet</Typography>
            ) : (
              this.props.apps.map((appItem: any, index: number) => {
                return (
                  <div key={`item-${index}`}>
                    {" "}
                    <Paper
                      elevation={3}
                      style={{ padding: "15px", margin: "20px 0" }}
                    >
                      <Grid style={{ alignItems: "center" }} container>
                        <Grid item xs={5}>
                          <div className="thumbnail-app">
                            <img src={appItem.appImage} alt={appItem.appName} />
                          </div>
                        </Grid>
                        <Grid style={{ padding: "0 20px" }} item xs={4}>
                          <Typography variant="h6">
                            {appItem.appName}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            onClick={() => {
                              this.editApp(appItem);
                            }}
                            style={{
                              width: "100%",
                              marginBottom: "5px",
                              minHeight: "60px"
                            }}
                            variant="contained"
                            color="primary"
                          >
                            Edit app
                            <EditSharpIcon style={{ marginLeft: "10px" }} />
                          </Button>
                          <Button
                            onClick={() => {
                              this.deleteApp(appItem);
                            }}
                            style={{
                              width: "100%",
                              marginTop: "5px",
                              minHeight: "60px"
                            }}
                            variant="contained"
                            color="secondary"
                          >
                            Delete app
                            <DeleteSharpIcon style={{ marginLeft: "10px" }} />
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </div>
                );
              })
            )}
          </div>
          <Fab
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px"
            }}
            color="primary"
            onClick={() => {
              this.props.toggleModal(true);
            }}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          {this.props.modalOpen === true ? <ModalForm /> : ""}
        </Container>
      );
    } else {
      return (
        <Container className="dashboard" fixed>
          <div style={{ marginBottom: "20px" }} className="dashboard-header">
            <Typography variant="h2">Please, sign in...</Typography>
          </div>
        </Container>
      );
    }
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Dashboard);
