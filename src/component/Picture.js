import React, { useState } from "react";
import Images from "../assets/Images.png";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  rear: {
    Width: 800,
    height: 300,
    justifyContent: "center"
  },
  color: {
    color: "#000000",
    fontFamily: "Roboto",
    lineHeight: 2.2,
    fontSize: 35,
    padding: 20,
    backgroundColor: "#f3f3f3"
  },
  logss: {
    backgroundColor: "#f3f3f3",
    padding: 100
  },
  font: {
    backgroundColor: "#96cbff",
    color: "white"
  }
}));

function Picture() {
  const classes = useStyles();

  return (
    <div className="image">
      <Typography className={classes.color}>
        <span className={classes.font}>F</span>riday
      </Typography>
      <div className={classes.logss}>
        <div>
          <img className={classes.rear} src={Images} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Picture;