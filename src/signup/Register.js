import React, { useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import LockOpenTwoToneIcon from "@material-ui/icons/LockOpenTwoTone";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import {NavLink,withRouter} from 'react-router-dom'
import axios from "axios";
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100
  },
  textFields: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100
  },
  textFieldss: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    paddingRight: 20
  },
  iconcolor: {
    color: "grey"
  },
  pass: {
    textAlign: "right",
    color: "#96cbff",
    marginTop: 6,
    marginBottom: 12,
    fontFamily: "Roboto",
    fontSize: 16
  },
  button: {
    fullwidth: 100,
    borderRadius: 5,
    backgroundColor: "#96cbff",
    marginTop: 50
  },
  col: {
    color: "#96cbff"
  },
 
  sign: {
    fontFamily: " 'Roboto', sans-serif",
    fontSize: 25,
    fontWeight: 500,
    lineHeight: 1.32,
    textAlign: "left",
    color: "#000000"
  },
  logs: {
    backgroundColor: "white",
    paddingTop: 100,
    paddingBottom: 50,
    paddingRight: 150,
    paddingLeft: 80
  },
  pi: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 1.31,
    padding: "auto",
    margin: "auto",
    marginTop: 75
  },
  txt: {
    width: 70
  },
  color: {
    color: "#96cbff"
  },
  formControl:{
      width:"370px"
}
}));

function Register(props) {
  const classes = useStyles();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  let [role,setRole]=useState('')
  useEffect(()=>{    
        if(localStorage.length){   
              props.history.push("/dashboard");  
              }  
             })
  
let onsubmit=(e)=>{
  e.preventDefault();
  console.log(firstname,lastname,email,password,cpassword,role)

  let data={ 
    "email": email,
    "password1": password,
    "password2": cpassword,
    "first_name": firstname,
    "last_name": lastname,
    "user_type": role
}

  // axios.post("http://friday-deploy.herokuapp.com/emailcheck/",{email})
  // .then(resp=>{
  //   console.log(resp.data)
  // })
   
  Axios.post("http://friday-deploy.herokuapp.com/rest-auth/registration/",data)
  .then(resp=>{
    console.log(resp.data)
    alert(resp.data.detail)
    props.history.push("/")
  })

}
  return (
    <div className="new">
      <div className={classes.logs}>
        <h3 className={classes.sign}>Sign up</h3>
        <form>
          <React.Fragment>
          <Grid container  spacing={2}>
          <Grid item xs={6}>

            <TextField
              id="input-with-icon-textfield"
              value={firstname}
              floatingLabel="First name"
              fullWidth
              label="First name"
              name="First name"
              onChange={e => setFirstname(e.target.value)}
              margin="normal"
              className={classes.textfields}
              InputProps={{
                endAdornment: (
                  <InputAdornment className={classes.iconcolor} position="end">
                    <PersonOutlineTwoToneIcon />
                  </InputAdornment>
                )
              }}
            />
            </Grid>
                      <Grid item xs={6}>

            <TextField

              id="input-with-icon-textfield"
              value={lastname}
              floatingLabel="Last name"
              label="Last name"
              name="Last name"
              fullWidth
              onChange={e => setLastname(e.target.value)}
              margin="normal"
              className={classes.textfieldss}
              InputProps={{
                endAdornment: (
                  <InputAdornment className={classes.iconcolor} position="end">
                    <PersonOutlineTwoToneIcon />
                  </InputAdornment>
                )
              }}
            />
</Grid>
</Grid>
            <TextField
              email
              validate
              id="input-with-icon-textfield"
              value={email}
              floatingLabel="Email"
              label="Email"
              name="email"
              fullWidth
              onChange={e => setEmail(e.target.value)}
              margin="normal"
              className={classes.textfield}
              InputProps={{
                endAdornment: (
                  <InputAdornment className={classes.iconcolor} position="end">
                    <EmailTwoToneIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              id="input-with-icon-textfield"
              floatingLabel="password"
              label="Password"
              type="password"
              value={password}
              name="password"
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
              floatingLabel="cpassword"
              label=" Confirm Password"
              value={cpassword}
              name="cpassword"
              type="password"
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
            <div  >
            <FormControl className={classes.formControl} >
        <InputLabel htmlFor="grouped-native-select">Roles</InputLabel>
        <Select native defaultValue=""    input={<Input id="grouped-native-select" />} onChange={e=>setRole(e.target.value)}>          
     

            <option value="" />
            <option value={1}> Admin</option>
            <option value={2}> Bussiness Anaylst</option>
            <option value={3}>Project Manager </option>
            <option value={4}>Team Lead </option>
            <option value={5}>Designer</option>
            <option value={6}>Client</option>
           
           
        
        </Select>
      </FormControl>
      </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
              onClick={onsubmit}

              // component={linking}
              // to="/"
            >
              Sign Up
            </Button>
            <Typography className={classes.click_pass}>Do you have account ? <NavLink to="/" >Click Here</NavLink></Typography>
          </React.Fragment>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Register);