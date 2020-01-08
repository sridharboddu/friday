import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Chevron from "../assets/Chevron.png"
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily: " 'Roboto', sans-serif",
    "& label": {
      fontWeight: "bold",
      fontSize: 18
    }
  },
  button: {
    fullwidth: 100,
    borderRadius: 10,
    backgroundColor: "#96cbff",
    float: "right",
    paddingBottom: 10
  },
  margin: {
    marginLeft: 70,
    marginRight: 70
  },
  icon: {
    width: 17,
    height: 27,
    marginTop: 5
  },
  forget: {
    fontFamily: " 'Roboto Condensed', sans-serif",
    fontSize: 25
  },
  size: {
    fontFamily: "Roboto regular",
    fontSize: 15,
    textAlign: "left",
    marginLeft: 5
  },
  marginn: {
    marginTop: 15,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 15
  },
  space: {
    marginBottom: 10
  }
}));
export default function Forget() {
  
    const[email,setEmail]=useState('')

  const classes = useStyles();
let onSend=(e)=>{      
  e.preventDefault();
  console.log(email)
  Axios.post("http://friday-deploy.herokuapp.com/rest-auth/password/reset/",{email})
  .then(resp=>{
      console.log(resp.data);
      alert(resp.data.detail)
  })
  .catch(error=>{
      alert(error)
  })
}
  return (
    <div className={classes.marginn}>
     <img className={classes.icon} src={Chevron} alt=""></img>
      <div className={classes.margin}>
        <Typography id="form-dialog-title" className={classes.forget}>
          Forget Password
        </Typography>
        <TextField
          margin="dense"
          id="name"
          label="Email"
          onChange={e=>setEmail(e.target.value)}
          className={classes.textField}
          type="email"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {/* <img src={Close} alt="" /> */}
              </InputAdornment>
            )
          }}
        />
        <Typography className={classes.size}>
          please enter the Email id you have entered during signup to get the
          password reset link
        </Typography>
        <Button variant="contained" color="primary" className={classes.button} onClick={onSend}>
          Send
        </Button>
      </div>
    </div>
  );
}