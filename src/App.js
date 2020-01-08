import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import AddProject from "./AddProject";
import Project_personas from "./Project_personas";
import Project_userstories from "./Project_userstories";
import Add_projects from './Add_projects';
import Project_view from './Project_view'
import Dashboard from './Dashboard';
// import ProjectViews from './ProjectViews';
import  Login from './signIn/Login';
import Registered from './Registered'
import SignIn from './signIn/SignIn';
import Forgot_success from './signIn/Forgotpass'
import Forgotpass from './signIn/Forgotpass';
import ProjectView_Personas from './ProjectView_Personas'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import SignUp from "./signup/SignUp"
// import LeftSide from "../LeftSideBar"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/" exact component={SignIn}/>  
        <Route path="/signup" component={SignUp}/>    
         <Route path="/account-confirm-email/:uid" component={Registered}/>  
         <Route path="/reset/:uid/:token/" component={Forgotpass} />   
          <Route path="/Header" component={Header} />   
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/AddProject" exact component={AddProject} />
          <Route path="/Project_personas" component={Project_personas} />
          <Route path="/ProjectView_Personas" component={ProjectView_Personas} />
          <Route path="/Project_userstories" component={Project_userstories} />
          <Route path="/project" component={Add_projects} />
          <Route path="/Project_view" component={Project_view} />
        </Switch>
      </Router>

      {/* <Project_userstories /> */}
    </div>
  );
}

export default App;
