import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid, InputLabel } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from 'axios';
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fullWidth: 200,
    cursor: "pointer",
    "& required": {
      content: "*",
      color: "red"
    }
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
    borderRadius: 10,
    float: "right",
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30,
    marginLeft: 30,
    backgroundColor: "#96cbff"
  },
  buttons: {
    width: 130,
    height: 45,
    borderRadius: 10,
    float: "right",
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 30,
    marginTop: 30,
    backgroundColor: "#96cbff"
  },
  newField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fullWidth: 200,
    paddingRight: 20,
    // paddingTop: 5,
    paddingBottom: 5,
    "& input": {
      display: "none"
    }
  },
  avatar: {
    backgroundColor: "white",
    color: "#96cbff",
    float: "Right",
    paddingTop: 25
  },
  container: {
    paddingLeft: 30
  },
  containerone: {
    paddingRight: 30
  },
  iconcolor: {
    color: "#96cbff"
  },
  capitalize: {
    textTransform: "lowercase",
    borderRadius: 10,
    fontSize: 20
  },
  capitalize2: {
    textTransform: "uppercase",
    fontSize: 20,
    marginLeft: 5
  }
  //   div.required label:after {
  //     content: " *";
  //     color: red;
  // }
}));

// const formLabelsTheme = createMuiTheme({
//   overrides: {
//     MuiFormLabel: {
//       asterisk: {
//         color: "#db3131",
//         "&$error": {
//           color: "#db3131"
//         }
//       }
//     }
//   }
// });

function Personas(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [family, setFamily] = useState("");
  const [picture, setPicture] = useState("");
  const [needs, setNeeds] = useState("");
  const [alert, setAlert] = useState([]);
  const [space, setSpace] = useState([]);
  const [data,setData]  = useState([]);
  const [imageName, setImageName] = useState("Upload Image Here");
  const [challenges, setChallenges] = useState("");
  const [usernameerror, setUsernameerror] = useState("");
  const [professionerror, setProfessionerror] = useState("");
  const [experienceerror, setExperienceerror] = useState("");
  const [locationerror, setLocationerror] = useState("");
  const [newneeds, setNewneeds] = useState([" "]);
  let [key,setKey]=useState('')

  const nameImage = e => {
    setPicture(e.target.files[0].name);
    setImageName(e.target.files[0].name);
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      let data = [...alert, needs];
      setAlert(data);
      setNeeds("");
    }
  };

  const handleKeyDown = e => {
    // console.log("fired");
    if (e.keyCode === 13) {
      let dataa = [...space, challenges];
      setSpace(dataa);
      setChallenges("");
    }
  };
  console.log(space);
  console.log(alert); 

  let onAddUser=(e)=>{
    let token=localStorage.getItem("token");
    let id=localStorage.getItem("set_project_id")
    console.log(alert,space)
    let data={
      "username":username,
    "profession":profession,
    "experience":experience,
    "description":description,
    "location": location,
    "family": family,
    // "picture": picture,
    "needs":"eat,sleep",
    "challenges": "time,jdsfj",
    "project_id":id
    }
     console.log(data)
    axios.post("http://friday-deploy.herokuapp.com/api/persona/",data,
    {headers: {'content-type':'application/json','Authorization':`Token ${token}` }}) 
    .then(resp=>{
      console.log(resp.data)
      if(resp.data){
        window.location.reload(false)
      
      }
     
    })
    .catch(error=>{
      console.log(error)
    })  
    

  }

  useEffect(()=>{
                                       

let token=localStorage.getItem("token");
let key=localStorage.getItem("edit_id");
setKey(key)
console.log(key,"id")
if(key){
  axios.post("http://friday-deploy.herokuapp.com/api/persona-view/",{"id":key},
    {headers:{"Authorization":`Token ${token}`}})
  .then(resp=>{ 
       console.log(resp.data,"data")
         let fill=resp.data
         setData(fill)
         setUsername(fill[0].fields.username)
         setProfession(fill[0].fields.profession)
         setLocation(fill[0].fields.location)
         setDescription(fill[0].fields.description)
        //  setPicture(fill[0].picture)
         setExperience(fill[0].fields.experience)
         setFamily(fill[0].fields.family)
         setChallenges(fill[0].fields.challenges)
         setNeeds(fill[0].fields.needs)
         console.log(fill,"filterdata")
       } ) 
  } 
 
    

  },[]
  )

  
  

  let onNext=(e)=>{
    let token=localStorage.getItem("token");
    let id=localStorage.getItem("set_project_id"); 
    let project_id=localStorage.getItem("project_id");  

    
    
     if(key){
      let data={
        "username":username,
      "profession":profession,
      "experience":experience,
      "description":description,
      "location": location,
      "family": family,    
      "needs":needs,
      "challenges": challenges,
      "project_id":project_id
      }
       console.log(data)
      axios.put(`http://friday-deploy.herokuapp.com/api/persona/${key}/`,data,
      {headers: {'content-type':'application/json','Authorization':`Token ${token}` }}) 
      .then(resp=>{     
        if(resp.data){
        console.log("success")
          localStorage.removeItem("edit_id");
          props.history.push("/project_view")
        }      
      })
      .catch(error=>{
        console.log(error)
      })
     }

      if(!key){
        let data={
          "username":username,
        "profession":profession,
        "experience":experience,
        "description":description,
        "location": location,
        "family": family,    
        "needs":needs,
        "challenges": challenges,
        "project_id":id
        }
         console.log(data)
        axios.post("http://friday-deploy.herokuapp.com/api/persona/",data,
        {headers: {'content-type':'application/json','Authorization':`Token ${token}` }}) 
        .then(resp=>{     
          if(resp.data){
          console.log("success")
            localStorage.setItem("r_id",1)
            props.history.push("/project")
          }      
        })
        .catch(error=>{
          console.log(error)
        })
      }
    
     
  }

  return (
    <div className="new">
      <div className={classes.padding}>
        <form>
          <React.Fragment>
            <Grid container>
              <Grid
                className={classes.containerone}
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
              >
                <TextField
                  required
                  id="input"
                  value={username}
                  floatingLabel="User name"
                  label="User name"
                  name="user name"
                  fullWidth
                  onChange={e => setUsername(e.target.value)}
                  margin="normal"
                  className={classes.textField}
                />

                <div style={{ fontsize: 12, color: "red" }}>
                  {usernameerror}
                </div>
                <TextField
                  id="input"
                  value={location}
                  floatingLabel="Location"
                  label="Location"
                  name="location"
                  fullWidth
                  onChange={e => setLocation(e.target.value)}
                  margin="normal"
                  className={classes.textfield}
                />
                <div style={{ fontsize: 12, color: "red" }}>
                  {locationerror}
                </div>
                <TextField
                  id="input"
                  value={family}
                  floatingLabel="Family"
                  multiline
                  label="Family"
                  name="family"
                  fullWidth
                  onChange={e => setFamily(e.target.value)}
                  margin="normal"
                  className={classes.textfield}
                />
              </Grid>
              <Grid
                className={classes.container}
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
              >
                <div className={classes.txt}>
                  <TextField
                    id="input"
                    Error
                    required
                    // InputLabelProps={{
                    //   content: "*",
                    //   color: "red"
                    // }}
                    value={profession}
                    floatingLabel="Profession"
                    label="Profession"
                    name="profession"
                    fullWidth
                    onChange={e => setProfession(e.target.value)}
                    margin="normal"
                    className={classes.textfield}
                  />
                </div>
                <div style={{ fontsize: 12, color: "red" }}>
                  {professionerror}
                </div>
                <TextField
                  id="input"
                  value={experience}
                  floatingLabel="Experience"
                  label="Experience"
                  name="experience"
                  fullWidth
                  onChange={e => setExperience(e.target.value)}
                  margin="normal"
                  className={classes.textfield}
                />
                <div style={{ fontsize: 12, color: "red" }}>
                  {experienceerror}
                </div>
                {/* onChange={e => setPicture(e.target.files[0])} */}
                <TextField
                  id="input-with-icon-textfield"
                  type="file"
                  name="picture"
                  disabled
                  style={{ display: "none" }}
                  fullWidth
                  onChange={nameImage}
                  margin="normal"
                  className={classes.textField}
                />
                <label htmlFor="input-with-icon-textfield">
                  <TextField
                    label={imageName}
                    disabled
                    fullWidth
                    margin="normal"
                    className={classes.textField}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          className={classes.iconcolor}
                        >
                          <PublishIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </label>
              </Grid>
            </Grid>
            <TextField
              id="input"
              value={description}
              floatingLabel="Description"
              multiline
              label="Description"
              name="Description"
              fullWidth
              onChange={e => setDescription(e.target.value)}
              margin="normal"
              className={classes.textfield}
            />
            <TextField
              id="input"
              value={needs}
              multiline
              floatingLabel="Needs/Goals"
              label="Needs/Goals"
              name="Needs/Goals"
             
              fullWidth
              onChange={e => setNeeds(e.target.value)}
              // onChange={handleNeeds}
              margin="normal"
              className={classes.textfield}
            />

            

            <TextField
              id="input"
              value={challenges}
              multiline
              floatingLabel="Challenges/Frustration"
              label="Challenges/Frustration"
              name="Challenges/Frustration"
             
              fullWidth
              onChange={e => setChallenges(e.target.value)}
              margin="normal"
              className={classes.textfield}
            />
            
            <div style={{backgroundColor:"red"}}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
              onClick={onNext}
              
            >
              <span className={classes.capitalize}>
                <span className={classes.capitalize2}>N</span>ext
              </span>
            </Button>
            {(!key) &&
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.buttons}
              onClick={onAddUser}
            >
              <span className={classes.capitalize}>
                <span className={classes.capitalize2}>A</span>dd
                <span className={classes.capitalize2}>U</span>ser
              </span>
            </Button>}
            </div>
          </React.Fragment>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Personas);
