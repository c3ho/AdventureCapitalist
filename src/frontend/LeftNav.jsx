import React, { useState, useEffect } from "react";

import ManagerItem from "./ManagerModal";
import UpgradeItem from "./UpgradeModal";
import {
  Grid,
  Button,
  Avatar,
  makeStyles,
  Fade,
  Dialog,
} from "@material-ui/core";
const io2 = require("socket.io-client");

let socket2;

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
    maxWidth: "95%",
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

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Drawer(props) {
  const { cash } = props;
  const classes = useStyles();

  const [managerOpen, setManagerOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [managers, setManagers] = useState([]);
  const [upgrades, setUpgrades] = useState([]);

  const handleManagerModalOpen = () => {
    setManagerOpen(true);
  };

  const handleManagerModalClose = () => {
    setManagerOpen(false);
  };

  const handleUpgradeModalOpen = () => {
    setUpgradeOpen(true);
  };

  const handleUpgradeModalClose = () => {
    setUpgradeOpen(false);
  };

  useEffect(() => {
    socket2 = io2.connect("http://localhost:8321");

    socket2.emit("managers", "getManagers");
    socket2.on("managers", (msg) => {
      setManagers(msg);
    });

    socket2.emit("upgrades", "getUpgrades");
    socket2.on("upgrades", (msg) => {
      setUpgrades(msg);
    });

    // Clean up
    return () => socket2.off;
  }, []);

  function handleManagerHireClick(managerNum) {
    console.log("setting manager!", managerNum);
    socket2.emit("managers", managerNum);
  }

  function handleUpgradePurchaseClick(upgradeNum) {
    console.log("setting upgrade!", upgradeNum);
    socket2.emit("upgrades", upgradeNum);
  }

  const listManagers =
    managers.length > 0
      ? managers.map((manager) => {
          return (
            <ManagerItem
              key={manager._managerNum}
              item={manager}
              hireClick={(e) => handleManagerHireClick(manager._managerNum)}
              isDisabled={cash < manager._cost || manager._hired}
            />
          );
        })
      : null;

  const listUpgrades =
    upgrades.length > 0
      ? upgrades.map((upgrade) => {
          return (
            <UpgradeItem
              key={upgrade._upgradeNum}
              item={upgrade}
              purchaseClick={() =>
                handleUpgradePurchaseClick(upgrade._upgradeNum)
              }
              isDisabled={cash < upgrade._cost || upgrade._purchased}
            />
          );
        })
      : null;

  //toDo: split modals into their own files, one for each upgrade / manager
  return (
    <div>
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Avatar className={classes.image}>Adventure Capitalist</Avatar>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.buttons} onClick={handleUpgradeModalOpen}>
            Upgrades
          </Button>
          <Dialog
            aria-labelledby="transition-modal-title"
            open={upgradeOpen}
            onClose={handleUpgradeModalClose}
            fullWidth="md"
            maxWidth="md"
          >
            <Fade in={upgradeOpen}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Upgrades</h2>
                {listUpgrades}
              </div>
            </Fade>
          </Dialog>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.buttons} onClick={handleManagerModalOpen}>
            Managers
          </Button>
          <Dialog
            aria-labelledby="transition-modal-title"
            open={managerOpen}
            onClose={handleManagerModalClose}
            fullWidth="md"
            maxWidth="md"
          >
            <Fade in={managerOpen}>
              <div>
                <h2 id="transition-modal-title">Managers</h2>
                {listManagers}
              </div>
            </Fade>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
}
