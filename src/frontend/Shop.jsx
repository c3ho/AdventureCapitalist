import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: "100%"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: '50%',
    height: "150%",
  },
  button: {
    flex: "true",
    width: "100%",
    height: "50px"
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
    paddingTop: "2px",
    fontSize: "20px"
  },
  store: {
      flex: "true",
      fontSize: "12px",
      height: "100%"
  }
}));

export default function ShopItem(props) {
    const {item: {_amount, _name, _timeOut, _currCost}, click, revClick, isDisabled} = props

    const classes = useStyles();

    function handleClick(event) {
        click();
    }

    function handleRevClick(event) {
        revClick();
    }
    function convertTime(time) {
        let seconds = time % 60;
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        time = (time - seconds) / 60;
        let minutes = time % 60;
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        let hours = (time - minutes) / 60;
        if (hours < 10) {
            hours = `0${hours}`
        }
        return `${hours}:${minutes}:${seconds}`
    }

    return(
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction="row">
                    <Grid container xs={12}>
                        <Grid item xs={3}>
                            <Button className={classes.store} onClick={e => handleRevClick(e)}>
                                {_name}<br/>
                                {_amount}
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container direction="row">
                                <Grid item xs={12}>
                                    <LinearProgress variant="determinate" value={12}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button disabled={isDisabled} className={classes.button} variant="contained" color="Secondary" onClick={e => handleClick(e)}>{_currCost}</Button>                                    
                                </Grid>
                                <Grid item xs={6}>
                                    <Container className={classes.timer}>
                                        <div className={classes.timerText}>{convertTime(_timeOut)}</div>
                                    </Container>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}