import React ,{useState} from "react"
import { makeStyles } from "@material-ui/core/styles";
import Register from "./Register";
import { Grid } from "@material-ui/core";
import Picture from "../component/Picture";

const useStyles = makeStyles(theme => ({
  padd: {
    paddingTop: 65,
    paddingBottom: 65,
    paddingLeft: 75,
    paddingRight: 75,
    backgroundColor: "#96cbff"
  },
  padd1: {
    boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: "#fff"
  }
}));

function SignUp() {
  const classes = useStyles();
  return (
    <div className={classes.padd}>
      <div className={classes.padd1}>
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Picture />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Register />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SignUp;