import React from "react";
import { InjectedFormProps, reduxForm, formValueSelector } from "redux-form";
import { Typography, Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { databaseRef } from "../../config";
import { mapsDispatchToProps } from "../../redux/store";
import Alert from "react-s-alert";
import { IProps } from "../../App";
interface IPreviewProps {
  appName: string;
  appColor: string;
  appImage: string;
  appDescription: string;
  appLocation: any;
  appCategories: boolean;
  appGPS: boolean;
}
class Preview extends React.Component<any> {
  handleSubmit = () => {
    let prevData = this.props.appItem;
    let appID = this.props.appItem.id;
    let userID = this.props.currentUser.uid;
    delete prevData.id;
    const newData = {
      appName: this.props.appName,
      appColor: this.props.appColor,
      appImage: this.props.appImage,
      appDescription: this.props.appDescription,
      appLocation: this.props.appLocation,
      appCategories: this.props.appCategories,
      appGPS: this.props.appGPS
    };
    for (let key in newData) {
      if (newData[key] === "") {
        Alert.error("All fields required!", {
          position: "bottom-left"
        });
        return;
      }
    }
    if (newData.appName.length > 16) {
      Alert.error("App name must be <15", {
        position: "bottom-left"
      });
      return;
    }
    if (JSON.stringify(prevData) === JSON.stringify(newData)) {
      Alert.warning("No changes were made", {
        position: "bottom-left"
      });
      return;
    }
    if (this.props.isEditing) {
      databaseRef.child(`apps/${userID}/${appID}`).set(newData, () => {
        this.props.setEditing(false, {});
        Alert.success("App updated!", {
          position: "bottom-left"
        });
      });
    } else {
      databaseRef
        .child(`apps/${this.props.currentUser.uid}`)
        .push(newData, () => {
          Alert.success("App added!", {
            position: "bottom-left"
          });
        });
    }
    this.props.toggleModal(false);
    this.props.setValues({}, {});
  };
  render() {
    const {
      appName,
      appColor,
      appImage,
      appDescription,
      appLocation,
      appCategories,
      appGPS
    } = this.props;
    return (
      <form>
        <Grid spacing={3} container>
          <Typography style={{ padding: "12px" }} variant="h5">
            Preview{" "}
          </Typography>
          <Grid item xs={12} xl={12} lg={12} md={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      App name
                    </TableCell>
                    <TableCell align="right">{appName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      App image
                    </TableCell>
                    <TableCell align="right">
                      <img style={{ maxHeight: "50px" }} src={appImage}></img>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Accent Color
                    </TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end"
                        }}
                      >
                        {" "}
                        {appColor}{" "}
                        <div
                          style={{
                            backgroundColor: appColor,
                            marginLeft: "10px",
                            width: "50px",
                            height: "30px",
                            display: "inline-block"
                          }}
                        ></div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      App description
                    </TableCell>
                    <TableCell
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                      align="right"
                    >
                      {appDescription}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      App location
                    </TableCell>
                    <TableCell
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                      align="right"
                    >
                      {appLocation === undefined ? "" : appLocation.address}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      More than one list or categories
                    </TableCell>
                    <TableCell align="right">
                      {appCategories ? "Enabled" : "Disabled"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      GPS Map
                    </TableCell>
                    <TableCell align="right">
                      {appGPS ? "Enabled" : "Disabled"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Button
          style={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
          onClick={this.handleSubmit}
        >
          Finish
        </Button>
      </form>
    );
  }
}

var selector = formValueSelector("addAppForm");

var PreviewForm = reduxForm({
  form: "addAppForm",
  forceUnregisterOnUnmount: false,
  destroyOnUnmount: false
})(Preview);

export default connect((state: any) => {
  const currentUser = state.main.currentUser;
  const isEditing = state.main.isEditing;
  const appItem = state.main.appItem;
  const {
    appName,
    appImage,
    appColor,
    appDescription,
    appLocation,
    appCategories,
    appGPS
  } = selector(
    state,
    "appName",
    "appImage",
    "appColor",
    "appDescription",
    "appLocation",
    "appCategories",
    "appGPS"
  );
  return {
    appName,
    appImage,
    appColor,
    appDescription,
    appLocation,
    appCategories,
    appGPS,
    currentUser,
    isEditing,
    appItem
  };
}, mapsDispatchToProps)(PreviewForm);
