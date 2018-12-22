import React from "react";
import PropListTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";

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

function PropBookCard(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
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
                style={{ fontSize: "25px" }}
              >
                {`${props.headline}`}
              </Typography>
              <Typography gutterBottom style={{ fontSize: "20px" }}>
                {`${props.location}`}
              </Typography>
              <Typography color="textPrimary" style={{ fontSize: "15px" }}>
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
            <Typography variant="subheading" style={{ fontSize: "25px " }}>
              {`${props.currtype}`}
              {`${props.price}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
PropBookCard.propTypes = {
  classes: PropListTypes.object.isRequired
};

export default withStyles(styles)(PropBookCard);
