import React from "react";
import Modal from "@material-ui/core/Modal";
import { Stepper, Container, Paper } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Welcome from "./FormSteps/Welcome";
import Branding from "./FormSteps/Branding";
import Info from "./FormSteps/Info";
import Features from "./FormSteps/Features";
import Preview from "./FormSteps/Preview";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { mapsStateToProps, mapsDispatchToProps } from "../redux/store";
import { IProps } from "../App";
interface IModalState {
  activeStep: string;
}
interface StepMap {
  Welcome: object;
  Branding: object;
  Info: object;
  Features: object;
  Preview: object;
}
class ModalForm extends React.Component<IProps, IModalState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeStep: "Welcome"
    };
  }

  handleNext = () => {
    const keys = Object.keys(this.stepMap);
    this.setState(prevState => {
      return {
        activeStep: keys[keys.indexOf(prevState.activeStep) + 1]
      };
    });
  };
  stepMap: StepMap = {
    Welcome: <Welcome onSubmit={this.handleNext} />,
    Branding: <Branding onSubmit={this.handleNext} />,
    Info: <Info onSubmit={this.handleNext} />,
    Features: <Features onSubmit={this.handleNext} />,
    Preview: <Preview />
  };
  render() {
    const activeStepComponent = this.stepMap[
      this.state.activeStep as keyof StepMap
    ];
    return (
      <Modal open={this.props.modalOpen}>
        <Container className="modal-container" maxWidth="md">
          <Paper className="modal-paper">
            <Button
              onClick={() => {
                if (this.props.isEditing) {
                  this.props.setValues({}, {});
                  this.props.setEditing(false, {});
                }
                this.props.toggleModal(false);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                minWidth: "auto"
              }}
            >
              <CloseIcon />
            </Button>
            <Stepper
              style={{ marginBottom: "30px" }}
              activeStep={Object.keys(this.stepMap).indexOf(
                this.state.activeStep
              )}
            >
              {Object.keys(this.stepMap).map(label => (
                <Step
                  onClick={() => {
                    this.setState({
                      activeStep: label
                    });
                  }}
                  key={label}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStepComponent}
          </Paper>
        </Container>
      </Modal>
    );
  }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(ModalForm);
