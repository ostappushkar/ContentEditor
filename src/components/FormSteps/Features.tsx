import React from "react";
import { InjectedFormProps, reduxForm, Field } from "redux-form";
import { Typography, Button, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Switcher } from "../MUIComponents";
import categoriesImage from "../images/Categories.jpg";
import gpsImage from "../images/GPS.jpg";
interface IFeaturesProps {
  appCategories: boolean;
  appGPS: boolean;
}
class Features extends React.Component<
  InjectedFormProps<IFeaturesProps> & IFeaturesProps
> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid spacing={3} container>
          <Typography style={{ padding: "12px" }} variant="h5">
            Turn on the feature you want to include in your app.{" "}
          </Typography>
          <Grid item xs={12} xl={6} lg={6} md={6}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <div className="thumbnail">
                  <img src={categoriesImage} alt="Categories"></img>
                </div>
                <Typography variant="h6"> Categories</Typography>
                <Typography variant="subtitle1">
                  Include more than one list or categories
                </Typography>
                <Field
                  type="checkbox"
                  checked="false"
                  name="appCategories"
                  component={Switcher}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} xl={6} lg={6} md={6}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <div className="thumbnail">
                  <img src={gpsImage} alt="GPS Map"></img>
                </div>
                <Typography variant="h6"> GPS Map</Typography>
                <Typography variant="subtitle1">Include a GPS map</Typography>
                <Field
                  type="checkbox"
                  checked="false"
                  name="appGPS"
                  component={Switcher}
                />
              </CardContent>
            </Card>
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
export default reduxForm({
  form: "addAppForm",
  forceUnregisterOnUnmount: false,
  destroyOnUnmount: false
})(Features);
