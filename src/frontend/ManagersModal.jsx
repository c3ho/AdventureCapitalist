import React, { useState, useEffect } from "react";
import ManagerItem from "./OptionComponent";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
const io2 = require("socket.io-client");
let socket2;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ManagersModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    socket2 = io2.connect("http://localhost:8321");

    socket2.emit("bar", "getManagers");
    socket2.on("bar", (msg) => {
      setManagers(msg);
      console.log("received msg", msg);
    });

    // Clean up
    return () => socket2.off;
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const displayManagers = () => {
    console.log("hi");
    managers.map((manager) => {
      return <ManagerItem key={manager._name} item={manager} />;
    });
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}></div>
          {displayManagers}
        </Fade>
      </Modal>
    </div>
  );
}
