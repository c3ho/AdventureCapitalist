import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

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
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: "50%",
    height: "150%",
    transition: "none",
  },
  button: {
    flex: "true",
    width: "100%",
    height: "50px",
  },
  timer: {
    backgroundColor: "grey",
    flex: "true",
    height: "100%",
    width: "100%",
  },
  timerText: {
    flex: "true",
    color: "white",
    paddingTop: "8px",
    fontSize: "20px",
  },
  store: {
    flex: "true",
    fontSize: "12px",
    height: "100%",
  },
}));

export default function ShopItem(props) {
  const {
    item: {
      _amount,
      _name,
      _currTime,
      _currCost,
      _timeOut,
      _baseTimerMultiplier,
    },
    click,
    revClick,
    isDisabled,
    isGetDisabled,
    cost,
    currTime,
  } = props;

  const classes = useStyles();

  function handleClick(event) {
    click();
  }

  function handleRevClick(event) {
    revClick();
  }

  // Converts the current time from milliseconds to hh:mm:ss
  function convertTime(time) {
    time /= 1000;
    let seconds = time % 60;
    seconds = seconds;
    let displaySeconds = Math.floor(seconds);
    if (seconds < 10) {
      displaySeconds = `0${displaySeconds}`;
    }

    time = (time - seconds) / 60;
    let minutes = time % 60;
    let displayMinutes = Math.round(minutes);
    if (minutes < 10) {
      displayMinutes = `0${displayMinutes}`;
    }

    let hours = (time - minutes) / 60;
    let displayHours = Math.round(hours);
    if (hours < 10) {
      displayHours = `0${displayHours}`;
    }
    if (_name === "Car Wash") {
      console.log("progress", _currTime);
      // debugger;
      console.log(
        "diff",
        _timeOut * _baseTimerMultiplier < 1000
          ? 100
          : (_currTime / (_timeOut / _baseTimerMultiplier)) * 100
      );
    }

    return `${displayHours}:${displayMinutes}:${displaySeconds}`;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="row">
          <Grid container>
            <Grid item xs={3}>
              <Button
                disabled={!isGetDisabled}
                className={classes.store}
                onClick={(e) => handleRevClick(e)}
              >
                {_name}
                <br />
                {_amount}
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Grid container direction="row">
                <Grid item xs={12}>
                  <LinearProgress
                    variant="determinate"
                    value={
                      // If timeOut on shop is less than 1s we will always assign 100% progress
                      _timeOut / _baseTimerMultiplier < 1000
                        ? 100
                        : (_currTime / (_timeOut / _baseTimerMultiplier)) * 100
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    disabled={isDisabled}
                    className={classes.button}
                    variant="contained"
                    color="Secondary"
                    onClick={(e) => handleClick(e)}
                  >
                    {currencyFormatter.format(_currCost)}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Container className={classes.timer}>
                    <div className={classes.timerText}>
                      {convertTime(_timeOut / _baseTimerMultiplier - _currTime)}
                    </div>
                  </Container>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
