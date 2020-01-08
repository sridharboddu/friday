import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Picture from "../component/Picture";
// import SignIn from "./register/SignIn";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import FormGroup from "@material-ui/core/FormGroup";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid, Link } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import LockOpenTwoToneIcon from "@material-ui/icons/LockOpenTwoTone";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import { Typography ,Dialog} from "@material-ui/core";
import axios from "axios";
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Forgot from "./Forgot.js"
import Axios from "axios";
import { NavLink } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  padd: {
    paddingTop: 123,
    paddingBottom: 65,
    paddingLeft: 75,
    paddingRight: 75,
  },
  cnf_button : {
    top: 56,
    
    width: "100%",
    height: 45,
    color:"white",
    fontSize:"20  Roboto",
    backgroundColor: "#96CBFF",
    borderRadius: 10,
    opacity: 1,
    boxShadow: "0px 0px 0px 0px ",
    "&:hover":{
        background: "none",
        backgroundColor: "#96CBFF",
      },
      '& span':{
        textTransform: "capitalize",
    
      },
  },


  cnf_fo:{
    top: 188,
    left: 797,

    height: 30,
    textAlign: "left",
    fontSize: 30,
    color: "black",
    opacity: 1,
  },
  


  padd1: {
    boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: "#fff"
  }
}));

function Forgotpass(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [data,setData]=useState('')
  
  const handleClickOpen = () => {
    console.log("yy");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let onlogin=(e)=>{
      e.preventDefault();          
      let  new_password1=password;
      let  new_password2=cpassword;
      let uid=props.match.params.uid;
      let token=props.match.params.token;
      console.log(password,cpassword,uid,token)   

      Axios.post("http://friday-deploy.herokuapp.com/rest-auth/password/reset/confirm/",{new_password1,new_password2,uid,token})
      .then(resp=>{
          console.log(resp.data)
          if(resp.data){
              setData(resp.data)
              alert(resp.data)
          }
      })
      .catch(error=>{
          alert(error)
      })
    
  }
  return (
    <div>
         
      <div className={classes.padd}>
      <div className={classes.logs}>
        <h3 className={classes.cnf_fo}>Create new password</h3>
        <form>
          <React.Fragment>
            <TextField
              email
              validate
              id="input-with-icon-textfield"
              value={password}
              floatingLabel="password"
              label="Enter password"
              name="enter password"
              fullWidth
              onChange={e => setPassword(e.target.value)}
              margin="normal"
              className={classes.textfield}
              InputProps={{
                endAdornment: (
                    <InputAdornment className={classes.iconcolor} position="end">
                    <LockOpenTwoToneIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              id="input-with-icon-textfield"
              floatingLabel="password"
              label="Confirm Password"
              value={cpassword}
              name="confirm password"
              fullWidth
              onChange={e => setCpassword(e.target.value)}
              margin="normal"
              className={classes.textfield}
              InputProps={{
                endAdornment: (
                  <InputAdornment className={classes.iconcolor} position="end">
                    <LockOpenTwoToneIcon />
                  </InputAdornment>
                )
              }}
            />
            {/* <Typography className={classes.for_gp} onClick={handleClickOpen}><a >Forgot Password?</a></Typography> */}
            {/* <Dialog open={open}
              onClose={handleClose}>
                <Forgot/>
            </Dialog>
              */}
            <div>
            
      </div>
            <Button
              variant="contained"
            //   color="primary"
              fullWidth
              className={classes.cnf_button}
              onClick={onlogin}             

              // component={linking}
              // to="/"
            >
              Sign In
            </Button>
            {/* <Typography className={classes.click_pass}>Don't have account ? <a >Click Here</a></Typography> */}
          </React.Fragment>
        </form>
      </div>
    </div>
    
    </div>
  );
}

export default Forgotpass;