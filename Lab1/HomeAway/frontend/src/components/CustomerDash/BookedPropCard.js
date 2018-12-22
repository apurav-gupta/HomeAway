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

function BookedPropCard(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Grid container spacing={16}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="complex"
              src="/static/images/grid/complex.jpg"
            />
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
                  {`${props.property_type}`} &nbsp;
                  <span class="glyphicon glyphicon-bed" />
                  {"    "} &nbsp;
                  {`${props.bedrooms}`}
                  &nbsp;
                  <span class="glyphicon glyphicon-tint" />
                  {"    "} &nbsp;
                  {`${props.bathrooms}`}
                </b>{" "}
                <br />
                {`${props.propertyid}`}
                <br />
                Check In: {`${props.arrive_date}`} &nbsp; Check Out:{" "}
                {`${props.depart_date}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subheading" style={{ fontSize: "25px " }}>
              {`${props.currtype}`}
              {`${props.dailyrate}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
BookedPropCard.propTypes = {
  classes: PropListTypes.object.isRequired
};

export default withStyles(styles)(BookedPropCard);
