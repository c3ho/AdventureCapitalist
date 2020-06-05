import React, { useState } from "react";
import { makeStyles, Modal, Fade, Backdrop } from "@material-ui/core";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  image: {
    width: "auto",
    height: 150,
    maxWidth: "100%",
    maxHeight: 150,
    flex: "true",
    textAlign: "center",
    verticalAlign: "middle",
    wordWrap: true,
  },
  buttons: {
    textAlign: "center",
    width: "100%",
    flex: "true",
  },
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

export default function LoadModal(props) {
  const classes = useStyles();
  const { open, difference } = props;
  const [modalOpen, setModalOpen] = useState(open);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Adventure Capitalist</h2>
            <p id="transition-modal-description">
              You have earned {currencyFormatter.format(difference)} while you
              were away!
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
