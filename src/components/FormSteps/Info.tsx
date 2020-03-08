import React from "react";
import {
  InjectedFormProps,
  reduxForm,
  Field,
  formValueSelector
} from "redux-form";
import { Typography, Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { TextArea } from "../MUIComponents";
import MapGoogle from "../googleMap";
import { AppLocation } from "../../App";
interface IInfoProps {
  appDescription: string;
  appLocation: AppLocation;
}
class Info extends React.Component<InjectedFormProps<IInfoProps> & IInfoProps> {
  render() {
    const { handleSubmit, appLocation } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid spacing={3} container>
          <Grid item xs={12} xl={6} lg={6} md={6}>
            <Typography style={{ marginBottom: "20px" }} variant="h5">
              Add your description
            </Typography>
            <Field
              name="appDescription"
              label="App Description"
              component={TextArea}
            />
          </Grid>
          <Grid item xs={12} xl={6} lg={6} md={6}>
            <Typography style={{ marginBottom: "20px" }} variant="h5">
              Enter your app location
            </Typography>

            <Field
              location={appLocation}
              name="appLocation"
              label="App Location"
              component={MapGoogle}
            />
          </Grid>
        </Grid>
        <Button
          style={{ marginTop: "20px" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Next
        </Button>
      </form>
    );
  }
}
var selector = formValueSelector("addAppForm");
var InfoForm = reduxForm<IInfoProps>({
  form: "addAppForm",
  forceUnregisterOnUnmount: false,
  destroyOnUnmount: false
})(Info);
export default connect(state => {
  const appLocation = selector(state, "appLocation");
  return {
    appLocation
  };
})(InfoForm);
