import React from "react";
import {
  InjectedFormProps,
  reduxForm,
  Field,
  formValueSelector
} from "redux-form";
import { Typography, Button, Grid } from "@material-ui/core";
import { ImageUpload, ColorPicker } from "../MUIComponents";
import { connect } from "react-redux";
interface IBrandingProps {
  appColor: string;
  appImage: string;
}
class Branding extends React.Component<
  InjectedFormProps<IBrandingProps> & IBrandingProps
> {
  render() {
    const { handleSubmit, appColor, appImage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid spacing={3} container>
          <Grid item xs={12} xl={6} lg={6} md={6}>
            <Typography style={{ marginBottom: "20px" }} variant="h5">
              Upload Your App Image
            </Typography>
            <Field
              name="appImage"
              label="App Image"
              image={appImage}
              component={ImageUpload}
            />
          </Grid>
          <Grid item xs={12} xl={6} lg={6} md={6}>
            <Typography style={{ marginBottom: "20px" }} variant="h5">
              Choose Your Accent Color
            </Typography>
            <Field
              name="appColor"
              label="Accent Color"
              color={appColor}
              component={ColorPicker}
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
var BrandingForm = reduxForm<IBrandingProps>({
  form: "addAppForm",
  forceUnregisterOnUnmount: false,
  destroyOnUnmount: false
})(Branding);
export default connect(state => {
  const { appColor, appImage } = selector(state, "appColor", "appImage");
  return {
    appColor,
    appImage
  };
})(BrandingForm);
