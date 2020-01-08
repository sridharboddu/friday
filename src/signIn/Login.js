import React, { useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
// import SignIn from "./register/SignIn";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import LockOpenTwoToneIcon from "@material-ui/icons/LockOpenTwoTone";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Typography ,Dialog} from "@material-ui/core";
import Forgot from "./Forgot"
import {NavLink,withRouter} from 'react-router-dom'
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  padd: {
    paddingTop: 123,
    paddingBottom: 65,
    paddingLeft: 75,
    paddingRight: 75,
  },
  Sign_button : {
    top: 24,
    
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


  sign_fo:{
    top: 188,
    left: 797,

    height: 30,
    textAlign: "left",
    fontSize: 30,
    color: "black",
    opacity: 1,
  },
  for_gp:{
    fontColor: "#96CBFF",
    textAlign: "right",

    marginTop:5,
  },
  click_pass:{
      marginTop:30,
      marginLeft:122,
      color: "#96CBFF",
      fontSize:16 ,
  letterSpacing: 0,
color: "#000000",
opacity: 1,

" & a":{
    color:"#96CBFF"
}
  },


  padd1: {
    boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: "#fff"
  }
}));

function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState("");
  useEffect(()=>{    
    if(localStorage.length){   
          props.history.push("/dashboard");  
          }   })

  const handleClickOpen = () => {
    console.log("yy");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let onLogin=(e)=>{
    e.preventDefault()
    console.log(email,password);    
    Axios.post("http://friday-deploy.herokuapp.com/rest-auth/login/",{email,password})
    .then(resp=>{
      console.log(resp.data)
      if(resp.data){
           let token=resp.data.key 
        Axios.get("https://friday-deploy.herokuapp.com/check_userType",
         {headers:{"Authorization":`Token ${token}`}})
         .then(resp=>{
           if(resp.data){
             localStorage.setItem("user_type",resp.data[0].fields.user_type);
             console.log(resp.data[0].fields.user_type,"user_type")
           }
                    
         })
        

        localStorage.setItem("token",resp.data.key);  
        props.history.push("/Dashboard")
        alert("Login Suceesfully")
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
        <h3 className={classes.sign_fo}>Sign In</h3>
        <form>
          <React.Fragment>
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
              value={password}
              name="password"
              type="password"
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
            <Typography className={classes.for_gp} onClick={handleClickOpen}><a >Forgot Password?</a></Typography>
            <Dialog open={open}
              onClose={handleClose}>
                <Forgot/>
            </Dialog>
             
            <div>
            
      </div>
            <Button
              variant="contained"
            //   color="primary"
              fullWidth
              className={classes.Sign_button}
              onClick={onLogin}

              // component={linking}
              // to="/"
            >
              Sign In
            </Button>
            <Typography className={classes.click_pass}>Don't have account ? <NavLink to="/SignUp" >Click Here</NavLink></Typography>
          </React.Fragment>
        </form>
      </div>
    </div>
    </div>
  );
}

export default withRouter (Login) ;