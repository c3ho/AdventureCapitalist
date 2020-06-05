import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Avatar } from "@material-ui/core";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: "100%",
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    backgroundColor: "#DCC6B4",
  },
  container: {
    flex: "true",
    width: "auto",
    margin: "auto",
  },
  button: {
    flex: "true",
    width: "auto",
    height: "50px",
    backgroundColor: "grey",
  },
  text: {
    color: "black",
    paddingTop: "2px",
    fontSize: "18px",
    textAlign: "center",
    backgroundColor: "#EDE3D9",
  },
  avatar: {
    width: "50px",
    height: "50px",
  },
}));

export default function ManagerItem(props) {
  const {
    item: { _name, _cost, _hired, _business },
    hireClick,
    isDisabled,
  } = props;

  const classes = useStyles();

  function handleClick(event) {
    hireClick();
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid
          container
          className={classes.container}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={1}>
            <Avatar className={classes.avatar}>TMP</Avatar>
          </Grid>
          <Grid item className={classes.text} xs={6}>
            {_name}
            <br />
            {currencyFormatter.format(_cost)}
          </Grid>
          <Grid item xs={1}>
            <Button
              className={classes.button}
              disabled={isDisabled}
              onClick={(e) => handleClick(e)}
            >
              Hire!
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
