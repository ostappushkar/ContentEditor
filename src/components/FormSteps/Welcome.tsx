import React from "react";
import { InjectedFormProps, reduxForm, Field } from "redux-form";
import { Typography, Button } from "@material-ui/core";
import { MUITextField } from "../MUIComponents";
import { IProps } from "../../App";
import { connect } from "react-redux";
import { mapsStateToProps } from "../../redux/store";
interface IWelcomeProps {
  appName: string;
}
class Welcome extends React.Component<
  InjectedFormProps<IWelcomeProps & IProps> & IProps
> {
  render() {
    const { handleSubmit, isEditing } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Typography style={{ marginBottom: "20px" }} variant="h5">
          {isEditing
            ? "Edit your app name"
            : "Welcome! Let us help you get started"}
        </Typography>
        <Field
          name="appName"
          label="App Name"
          component={MUITextField}
          type="text"
        />

        <Typography variant="subtitle1">
          {isEditing
            ? ""
            : "Remember. You can always change your options in our App configuration screens"}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Next
        </Button>
      </form>
    );
  }
}
export default connect(mapsStateToProps)(
  reduxForm<IWelcomeProps>({
    form: "addAppForm",
    forceUnregisterOnUnmount: false,
    destroyOnUnmount: false
  })(Welcome)
);
