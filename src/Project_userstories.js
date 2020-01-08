import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios  from 'axios';
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  padding: {
    padding: "auto",
    paddingLeft: 200,
    paddingRight: 200,
    paddingTop: 50,
    paddingLeft: 200
  },
  button: {
    width: 130,
    height: 45,
    float: "right",
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30,
    marginLeft: 30,
    backgroundColor: "#96cbff"
  },
  buttons: {
    width: 130,
    height: 45,
    float: "right",
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 30,
    marginTop: 30,
    backgroundColor: "#96cbff"
  },
  capitalize: {
    textTransform: "lowercase",
    fontSize: 20
  },
  capitalize2: {
    textTransform: "uppercase",
    marginLeft: 5,
    fontSize: 20
  },

}));

function Userstories(props) {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [given, setGiven] = useState("");
  const [when, setWhen] = useState("");
  const [then, setThen] = useState("");
  const [hours, setHours] = useState("");
  const [bhours, setBhours] = useState("");
  const [show, setShow] = useState(false);
  const [pk,setPk]=useState("")


  useEffect(()=>{   

     let pk=localStorage.getItem("pk");
     setPk(pk)
     let project_id=localStorage.getItem("project_id");
     let token=localStorage.getItem("token");

     if(pk){
      axios.post("https://friday-deploy.herokuapp.com/api/storie-view/",{"id":project_id},
      {headers:{"Authorization":`Token ${token}`}})
      .then(resp=>{
        console.log(resp.data)
        if(resp.data){
          let fill=resp.data.filter(i=>{
            return i.pk==pk
          })
          if(fill){
            setUser(fill[0].fields.user);
            setGiven(fill[0].fields.given);
            setWhen(fill[0].fields.when);
            setThen(fill[0].fields.then);
            setHours(fill[0].fields.frontend_hours);
            setBhours(fill[0].fields.backend_hours)
          }
        }
      })
     }

       
       

    let user=localStorage.getItem("user_type");
     if( user==4 ){
       setShow(true)
     }    
  
    if(!localStorage.length){   
      props.history.push("./");   
          } 
            
          var id = localStorage.getItem("set_project_id");
              //        if(!id){  
              // props.history.push("./AddProject"); 
              //                               }


   },[])


  let onSubmit=(e)=>{
    e.preventDefault();
    let token=localStorage.getItem("token");
    let id=localStorage.getItem("set_project_id");
    let project_id=localStorage.getItem("project_id");

    
    let pk=localStorage.getItem("pk");    

    if(show){
      let data={
        "frontend_hours":hours,
        "backend_hours":bhours
       
      }
      console.log(data);
      axios.put(`https://friday-deploy.herokuapp.com/api/storie-hour/${pk}/`,data,
        {headers:{"Authorization":`Token ${token}`}})
        .then(resp=>{
             localStorage.removeItem("r_id")
             localStorage.removeItem("pk")
             props.history.push("/dashboard"); 
          console.log(resp.data)})
        .catch(error=>{console.log(error)})    
      }
      else if(pk){
        let data={        
            "project_id":project_id,
            "user": user,
            "given": given,
            "when": when,
            "then": then
        }
        console.log(data);
        axios.put(`http://friday-deploy.herokuapp.com/api/storie/${pk}/`,data,
          {headers:{"Authorization":`Token ${token}`}})
          .then(resp=>{
               localStorage.removeItem("r_id")
               localStorage.removeItem("pk")
               props.history.push("/dashboard"); 
            console.log(resp.data)})
          .catch(error=>{console.log(error)})  
         
        }                   
    else{
    let data={
      "user":user,
      "given":given,
      "when":when,
      "then":then,
      "project_id":id
    }
    console.log(data);
    axios.post("https://friday-deploy.herokuapp.com/api/storie/",data,
      {headers:{"Authorization":`Token ${token}`}})
      .then(resp=>{
           localStorage.removeItem("r_id")
           localStorage.removeItem("pk")
           props.history.push("/dashboard"); 
        console.log(resp.data)})
      .catch(error=>{console.log(error)})    
    }
  }

  return (
    <div className="new">
      <div className={classes.padding}>
        <form>
          <React.Fragment>
            <TextField
              id="input"
              value={user}
              floatingLabel="User"
              label="User"
              name="user"
              fullWidth
              onChange={e => setUser(e.target.value)}
              margin="normal"
              className={classes.textfield}
            />
            <TextField
              id="input"
              value={given}
              floatingLabel="Given"
              label="Given"
              name="given"
              fullWidth
              onChange={e => setGiven(e.target.value)}
              margin="normal"
              className={classes.textfield}
            />
            <TextField
              id="input"
              value={when}
              floatingLabel="When"
              label="When"              
              name="when"
              fullWidth
              onChange={e => setWhen(e.target.value)}
              margin="normal"
              className={classes.textfield}
            />
            <TextField
              id="input"
              value={then}
              floatingLabel="Then"
              label="Then"
              name="then"
              fullWidth
              onChange={e => setThen(e.target.value)}
              margin="normal"
              className={classes.textfield}
            />
            {show &&
              <div>
            <TextField
              id="input"
              value={hours}
              floatingLabel="Hours"
              label="Hours"
              name="hours"
              fullWidth
              onChange={e =>setHours(e.target.value)}
              margin="normal"
              className={classes.textfield}
            />
            <TextField
            id="input"
            value={bhours}
            floatingLabel="BHours"
            label="Backend Hours"
            name="bhours"
            fullWidth
            onChange={e => setBhours(e.target.value)}
            margin="normal"
            className={classes.textfield}
          /></div>}
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
              onClick={onSubmit}
            >
              <span className={classes.capitalize}>
                <span className={classes.capitalize2}>S</span>ubmit
              </span>
            </Button>
            { !pk &&
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.buttons}
            >
              <span className={classes.capitalize}>
                <span className={classes.capitalize2}>A</span>dd
                <span className={classes.capitalize2}>S</span>tory
              </span>
            </Button>}
          </React.Fragment>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Userstories) ;
