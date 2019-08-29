import React from "react";
import { IfFirebaseUnAuthed, IfFirebaseAuthed } from "@react-firebase/auth";
import { Typography, Button, Icon } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import ModalForm from "./modalForm";

const Dashboard: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <div className="dashboard">
      <Container fixed>
        <IfFirebaseUnAuthed>
          {() => {
            return <Typography variant="h1">Please, sign in</Typography>;
          }}
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthed>
          {() => {
            return (
              <div className="dashboard-content">
                <div className="dashboard-header">
                  <Typography variant="h6">My Dashboard</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    <AddIcon />
                    Create App
                  </Button>
                </div>
                <div className="dashboard-body"></div>
                <ModalForm modalOpen={modalOpen} />
              </div>
            );
          }}
        </IfFirebaseAuthed>
      </Container>
    </div>
  );
};
export default Dashboard;
