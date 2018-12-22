import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Paper } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 1200,
    padding: theme.spacing.unit * 2
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

function Card(props) {
  const { classes } = props;
  return (
    <div onClick={props.onClick}>
      {props.value}
      <Paper className={classes.root}>
        {props.value}
        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={props.photo} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subheading"
                  style={{ fontSize: "30px" }}
                >
                  <b>{`${props.headline}`}</b>
                </Typography>
                <Typography gutterBottom style={{ fontSize: "25px" }}>
                  {`${props.location}`}
                </Typography>
                <Typography color="textPrimary" style={{ fontSize: "20px" }}>
                  <b>
                    <span class="glyphicon glyphicon-home" />
                    {"    "} &nbsp;
                    {`${props.propertytype}`} &nbsp;
                    <span class="glyphicon glyphicon-bed" />
                    {"    "} &nbsp;
                    {`${props.beds}`}
                    &nbsp;
                    <span class="glyphicon glyphicon-tint" />
                    {"    "} &nbsp;
                    {`${props.baths}`}
                  </b>{" "}
                  <br />
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subheading" style={{ fontSize: "20px " }}>
                {`${props.currtype}`}
                {`${props.price}`}
                {"     "}
                per night
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
Card.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Card);
