import React ,{useState,useEffect}from 'react';
import './Style.css';
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Header from "./Header";
import Project_userstories from "./Project_userstories";
import Project_personas from "./Project_personas";
import add from "./assets/add.png";
import {Grid} from "@material-ui/core"
import { Link } from "react-router-dom"; 
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  }
  
  const useStyles = makeStyles(theme => ({

  }));
  
  export default function Add_projects(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [color, setColor] = React.useState();
    useEffect(()=>{    
      let id =localStorage.getItem("r_id");
      let ids=parseInt(id);
       if(ids){
        setValue(ids)
       }
             
  
      if(!localStorage.length){   
        props.history.push("./");   
            } 
            var sid = localStorage.getItem("set_project_id");
            var pid=localStorage.getItem("project_id");
            
            // if(!sid || !pid){   
            //   props.history.push("/addproject");   
            //       } 


          },[])
                                          
      const handleChanges = newValue => {
      console.log(newValue);
      setValue(newValue);
    };
    const handleChange = (event, newValue) => {
      setValue(newValue);
      setColor(color);
      console.log("newb");
    };
  
    const handleChangeIndex = index => {
      setValue(index);
    };



  
    return (
      <div className={classes.space}>
      <div style={{ backgroundColor: "Lightgray" }}>
      <Header />
      <Grid Container Spacing={24}>
        <div style={{ display: "flex" }}>
          <Grid item xs={1}>
            <div className="LeftSideBar img">
            <Link to="/addproject"><img src={add} /></Link>
            </div>
          </Grid>
          <Grid item xs={11}>  
        <div
          className={classes.spaces}
          // classes={{
          //   fullWidth: classes.tabs
          // root: classes.tabs,
          // flexContainer: classes.tabs
          // }}
        >
          <div className="content-tabs">
              <Tabs
              
                value={value}
                onChange={handleChange}
                indicatorColor="red"
                textColor="white"
                fullWidth
                aria-label="full width tabs example"
              >
                <Tab
                  classes={{
                    wrapper: classes.tabss,
                    wrapped: classes.tabss,
                    textColorPrimary: classes.color
                  }}
                  label="Personas"
                  {...a11yProps(0)}
                />
                <Tab class="MuiTab-wrapper"
                  classes={{
                    wrapper: classes.tabss,
                    wrapped: classes.tabss,
                    textColorPrimary: classes.color
                  }}
                  label="User Stories"
                  {...a11yProps(1)}
                />
              </Tabs>
          
          </div>
  
          <SwipeableViews
            // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} >
              <Project_personas/>
             
            </TabPanel>
            <TabPanel value={value} index={1} >
             
              <Project_userstories/>
              
            </TabPanel>
          </SwipeableViews>
        </div>
        </Grid>
        </div>
        </Grid>
        </div>
      </div>
    );
  }