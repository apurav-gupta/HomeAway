import React from "react";
import PropListTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

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

function ownerInboxCard(props) {
  const { classes } = props;
  return (
    <div onClick={props.onClick}>
      {props.value}
      <Paper className={classes.root}>
        {props.value}
        <Grid container spacing={16}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                {" Property Name:"}
                <Typography
                  gutterBottom
                  variant="subheading"
                  style={{ fontSize: "25px" }}
                >
                  {`${props.property_name}`}
                </Typography>

                <Typography color="textPrimary" style={{ fontSize: "15px" }}>
                  {"  Message:  "} <br />
                  <b>{`${props.traveller_message}`} &nbsp;</b> <br />
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              {" Traveller mailId:"}
              <Typography variant="subheading" style={{ fontSize: "25px " }}>
                {`${props.customer_mail}`}
              </Typography>
              <Typography variant="subheading" style={{ fontSize: "25px " }} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
ownerInboxCard.propTypes = {
  classes: PropListTypes.object.isRequired
};

export default withStyles(styles)(ownerInboxCard);
