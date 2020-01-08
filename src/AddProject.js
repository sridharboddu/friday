import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PublishIcon from "@material-ui/icons/Publish";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import { NoEncryption } from "@material-ui/icons";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Header from "./Header";
import axios from 'axios';
import {withRouter,Link} from 'react-router-dom';
import add from "./assets/add.png";
import {Grid} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fullWidth: 200,
    cursor: "pointer"
  },
  textFieldd: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fullWidth: 200,
    cursor: "pointer",
    "& input": {
      color: "transparent",
      textShadow: "0 0 0 #282829"
    }
    // input: {
    //   color:"transparent",
    //   &:focus{
    //     outline:"none"
    //   }
    // }
  },

  newField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    cursor: "pointer",
    paddingRight: 20,
    // paddingTop: 5,
    paddingBottom: 2,
    "& input": {
      display: "none"
    }
  },

  padding: {
    padding: "auto",
    paddingLeft: 200,
    paddingRight: 200,
    paddingTop: 50,
    paddingBottom: 200
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
  root: {
    backgroundColor: theme.palette.background.paper,
    fullWidth: 100
  },
  buttons: {
    width: 100,
    float: "right",
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 30,
    marginTop: 30
  },
  font: {
    fontFamily: "Roboto",
    fontSize: 28,
    margin: 50
  },
  space: {
    padding: "auto",
    paddingTop: 45,
    paddingBottom: 45,
    paddingLeft: 45,
    paddingRight: 45,
    backgroundColor: "#f0f0f7"
  },
  avatar: {
    backgroundColor: "white",
    color: "#96cbff",
    float: "Right",
    paddingTop: 25
  },
  iconcolor: {
    color: "#96cbff"
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
  LeftSideBar: {
    color: "red",
    width: "60px",
    height: "600px",
    backgroundColor: "white",
    "& img": {
      width: "30px",
      marginTop: "10px"
    }
  }
}));

function Addproject(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [titleerror, setTitleerror] = useState("");
  const [descriptionerror, setDescriptionerror] = useState(" ");
  const [clienterror, setclientError] = useState(" ");
  const [imageName, setImageName] = useState("upload Image here");
  const [logo, setLogo] = useState(null);
  const [data, setData] = useState([]);

  //   function validate() {
  //     let titleerror = "";
  //     let descriptionerror = "";
  //     let clienterror = "";

  //     if (!description) {
  //       descriptionerror = "This field is required";
  //     }

  //     if (!title) {
  //       titleerror = "This field is required";
  //     }
  //     if (!client) {
  //       clienterror = "This field is required";
  //     }
  //     if (titleerror || descriptionerror || clienterror) {
  //       setTitleerror(titleerror);
  //       setDescriptionerror(descriptionerror);
  //       setclientError(clienterror);
  //       return false;
  //     }
  //     return true;
  //   }
  const newImage = e => {
    setLogo(e.target.files[0].name);
    setImageName(e.target.files[0].name);
  };
  //   const handleAdd = e => {
  //     e.preventDefault();
  //     const isValid = validate();
  //     if (isValid) {
  //       let headers = {
  //         "Content-Type": "multipart/form-data",
              
  //       };
  //       let data = new FormData();

  //       data.append("title", title);
  //       data.append("description", description);
  //       data.append("client", client);
  //       // data.append("created_by", "me");
  //       data.append("logo", logo);
  //       axios
  //         .post(ADDPROJECT_URL, data, { headers })
  //         .then(resp => {
  //           console.log(resp);
  //           localStorage.setItem("userId", resp.data.id);
  //           props.history.push("/Newp");
  //         })
  //         .catch(error => {
  //           console.log(error.response);
  //         });
  //     }
  //   };

  let onSubmit=(e)=>{ 
    let token=localStorage.getItem("token"); 
      // let formData=new FormData();;
      // formData.append("file",logo)
      // console.log(formData,client)
    let data={
      "title":title,
      "description":description,
      "client":client
         }      
    console.log(data)
   axios.post("http://friday-deploy.herokuapp.com/api/project/",data,           
   {headers: { "Content-Type": "multipart/form-data","Content-Type":"application/json",'Authorization':`Token ${token}` }})         

    .then(resp=>{
      console.log(resp.data)
      localStorage.setItem("set_project_id",resp.data.id);
      props.history.push("/project")
    })
    .catch(error=>{
      console.log(error)
    })      
    
  }

  React.useEffect(()=>{
    let key=localStorage.getItem("token"); 
    axios.get("https://friday-deploy.herokuapp.com/ListOfClients/",
     {headers:{"Authorization":`Token ${key}`}})
     .then(resp=>{
       console.log(resp.data);
       setData(resp.data)
     })
  },[])

  return (
    <div style={{ backgroundColor: "Lightgray" }}>
        <Header />
        <Grid Container Spacing={24}>
          <div style={{ display: "flex" }}>
            <Grid item xs={1}>
              <div className={classes.LeftSideBar}>
              <Link to="/addproject"><img src={add} /></Link>
              </div>
            </Grid>
            <Grid item xs={11}>
    <div className={classes.space}>
       <Header/>
      <Typography className={classes.font}>Add Project</Typography>
      <div className={classes.root}>
        <div className={classes.padding}>
          <form enctype='multipart/form-data'>
            <React.Fragment>
              <TextField
                required
                id="input"
                value={title}
                label="Title"
                name="title"
                fullWidth
                onChange={e => setTitle(e.target.value)}
                margin="normal"
                className={classes.textfield}
              />
              <div style={{ fontsize: 12, color: "red" }}>{titleerror}</div>
              <TextField
                required
                id="input"
                value={description}
                label="Description"
                name="description"
                fullWidth
                onChange={e => setDescription(e.target.value)}
                margin="normal"
                className={classes.textfield}
              />
              <div style={{ fontsize: 12, color: "red" }}>
                {descriptionerror}
              </div>              
              
              <div  >
              <FormControl className={classes.formControl} >
          <InputLabel htmlFor="grouped-native-select">clients</InputLabel>
          <Select native defaultValue=""  style={{minWidth: "845px"}} input={<Input id="grouped-native-select" />} onChange={e=>setClient(e.target.value)}>          
          <option value=""></option>
            {
              data.map(i=>(
                <React.Fragment>      
                        
                <option value={i.pk}>{i.fields.username}</option>
                </React.Fragment>
              ))
            }                 
             
          
          </Select>
        </FormControl>
        </div>
        <div style={{ fontsize: 12, color: "red" }}>{clienterror}</div>
              <TextField
                id="input-with-icon-textfield"
                type="file"
                name="logo"
                disabled
                style={{ display: "none" }}
                fullWidth
                onChange={newImage}
                className={classes.newField}
              />
              <label htmlFor="input-with-icon-textfield">
                <TextField
                  placeholder={imageName}
                  // style={{ display: "none" }}
                  fullWidth
                  margin="normal"   
                  disabled               
                  className={classes.textFieldd}
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

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
                onClick={onSubmit}
              >
                <span className={classes.capitalize}>
                  <span className={classes.capitalize2}>N</span>ext
                </span>
              </Button>
            </React.Fragment>
          </form>
        </div>
      </div>
    </div>
    </Grid>
    </div>
    </Grid>
</div>
  );
}

export default withRouter (Addproject) ;
