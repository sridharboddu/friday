import React, { Component } from "react";
import { Card, withStyles, Typography, Button,Grid } from "@material-ui/core";
import axios from 'axios';
import Header from "./Header";
import {NavLink,withRouter} from 'react-router-dom'
import { Link } from "react-router-dom"; 
import add from "./assets/add.png"
const styles = {
  mainCard: {
    padding: "15px 10px 20px 89px",
    backgroundColor: "#FFFFFF",
    opacity: 1,
    display: "flex",
    flexWrap: "wrap",
  },
  ImageCard: {
    width: 210,
    height: 264,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 3px 6px #00000033",
    opacity: 1,
    margin: "55px 0px 0px 45px"
  },
  ProjectImage: {
    width: 212,
    height: 212,

    opacity: 1
  },
  ProjectName: {
    textAlign: "left",
    fontSize: 20,
    fontFamily: "Roboto",
    letterSpacing: 0.4,
    color: "#000000",
    opacity: 1,
    fontStyle:"Bold"
  },
  LeftSideBar: {
    color: "red",
    width: "60px",
    height: "500px",
    backgroundColor: "white",
    "& img": {
      width: "30px",
      marginTop: "10px"
    }
  }
};

const Dashboard=(props)=> {
  
    const { classes } = props;
    let [data,setData]=React.useState([]);
    
    React.useEffect(()=>{

        if(!localStorage.length){   
                props.history.push("./");   
                    } 
        let token=localStorage.getItem("token")
        axios.get("http://friday-deploy.herokuapp.com/api/project-view/",
        {headers: {'Authorization':`Token ${token}` }}
        )
        .then(resp=>{
            console.log(resp.data)
            setData(resp.data)
        })
    },[])
    
    let clickHanlder=(id)=>{         
         localStorage.setItem("project_id",id);
         props.history.push("/project_view");
            }
      
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
            <div style={{marginTop:'20px'}}>
      <Card className={classes.mainCard}>
        {data.map((childs, index) => (
          <Card className={classes.ImageCard} key={index}>
          <img alt="" src={childs.logo} className={classes.ProjectImage} />
            <Typography className={classes.ProjectName}>
              <a onClick={e=>clickHanlder(childs.id)}>{childs.title}</a>
            </Typography>
          </Card>
         
        ))}
      </Card>
      </div>
      </Grid>
      </div>
</Grid>
      </div>
    );
  }

export default withStyles(styles)(Dashboard);