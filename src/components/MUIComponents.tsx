import React from "react";
import { TextField } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import Switch from "@material-ui/core/Switch";
import { ChromePicker } from "react-color";
import axios from "axios";
import Alert from "react-s-alert";

export const MUITextField = ({ label, name, input }: any) => (
  <TextField name={name} label={label} {...input} />
);
interface IUploaderProps {
  input: any;
  label: string;
  name: string;
  image: string;
}
export class ImageUpload extends React.Component<IUploaderProps> {
  public initImage = [];
  handleChange = (files: any) => {
    if (files.length === 1) {
      let formData = new FormData();
      formData.append("image", files[0]);
      var apiUrl = "https://api.imgur.com/3/image";
      var apiKey = "7f2973d0c528ca1";
      axios({
        method: "post",
        url: apiUrl,
        responseType: "json",
        headers: {
          Authorization: "Client-ID " + apiKey
        },
        data: formData
      }).then((res: any) => {
        this.props.input.onChange(res.data.data.link);
        Alert.success("Image added", {
          position: "bottom-left"
        });
      });
    } else {
      this.props.input.onChange("");
      Alert.warning("Image deleted", {
        position: "bottom-left"
      });
    }
  };
  componentWillMount() {
    if (this.props.image) {
      this.initImage.push(this.props.image);
    }
  }
  render() {
    return (
      <DropzoneArea
        initialFiles={this.initImage}
        showAlerts={false}
        onChange={this.handleChange}
        showPreviewsInDropzone={false}
        showPreviews={true}
        acceptedFiles={["image/*"]}
        filesLimit={1}
      />
    );
  }
}
interface IPickerProps {
  input: any;
  label: string;
  name: string;
  color: string;
}
export class ColorPicker extends React.Component<IPickerProps> {
  handleColorChange = (color: any) => {
    this.props.input.onChange(color.hex);
  };
  render() {
    return (
      <div>
        <ChromePicker
          disableAlpha={true}
          color={this.props.input.value}
          onChange={this.handleColorChange}
        />
      </div>
    );
  }
}
export const TextArea = ({ input, name }: any) => {
  return (
    <TextField
      name={name}
      {...input}
      fullWidth
      multiline
      rows="13"
      variant="outlined"
    />
  );
};
interface ISwitcher {
  input: any;
}
export class Switcher extends React.Component<ISwitcher> {
  componentDidMount() {
    this.props.input.onChange(this.props.input.checked);
  }
  render() {
    return (
      <Switch
        color="primary"
        checked={this.props.input.checked}
        onChange={this.props.input.onChange}
      ></Switch>
    );
  }
}
