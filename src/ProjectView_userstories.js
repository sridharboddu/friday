import React, {useState,useEffect}from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Menu from '@material-ui/core/Menu';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
 
  table: {
    minWidth: 650
  },
  paper: {
    marginTop: 28
  },
  textSize: {
    fontSize: 20
  },
  textSize_given: {
    fontSize: 20,
    paddingLeft: 88,
    '& svg':{
        marginTop:'5px'
    }
  },
  edit: {
    marginTop: 30,
    float: "right",
    marginRight: 30

  },
  back: {
    marginTop: 30,
    float: "right",
    marginRight: 170
  },
  fri: {
    marginTop: 60,
    margin: 25
  }, 
  rootIcon:{
    
    width:"25px",
    height:"17px",
    marginLeft:'5px',
    marginTop:'2px'
  },
  rootIconG:{
    
    width:"25px",
    height:"17px",
    marginLeft:'5px',
    marginTop:'2px'
  }
});

function createData(name, page, When, Then, link, hours) {
  return { name, page, When, Then, link, hours };
}



 function ProjectView_userstories(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [OpenUser, setOpenUser] = useState(false);
  let [data,setData]=useState([])
  const [rows,setRows]=React.useState([])
  

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
useEffect(()=>{
    if(localStorage.user_id){   
     props.history.push("/Project_view");  
     } 
  let id=localStorage.getItem("project_id");
  let token=localStorage.getItem("token");

  axios.post(`https://friday-deploy.herokuapp.com/api/storie-view/`,{"id":id},
  {headers:{"Authorization":`Token ${token}`}})
  .then(resp=>{
    console.log(resp.data);
    setRows(resp.data)
  })     
},[])

console.log(rows,"rows")

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  let editStories=(pk)=>{
       localStorage.setItem("pk",pk);
       localStorage.setItem("r_id",1)
       props.history.push("/project")
  }

  // return focus to the button when we transitioned from !open -> open
 
  return (
    <div className={classes.root}>
      <h2 className={classes.fri}>Friday</h2>
      <TableContainer component={Paper} className={classes.paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.textSize}>Users
              <ArrowDropDownIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} classes={{root:classes.rootIcon}}/>             
              <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseUser}
      >
        <MenuItem onClick={handleCloseUser}>Profile</MenuItem>
        <MenuItem onClick={handleCloseUser}></MenuItem>
        <MenuItem onClick={handleCloseUser}></MenuItem>
      </Menu>
              
              </TableCell>
              <TableCell className={classes.textSize_given} align="left" >
            
                Given
                <ArrowDropDownIcon
                 ref={anchorRef}
                 aria-controls={open ? 'menu-list-grow' : undefined}
                 aria-haspopup="true"
                 onClick={handleToggle}
                 classes={{root:classes.rootIconG}}
                />
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}></MenuItem>
                    <MenuItem onClick={handleClose}></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
              </TableCell>
              <TableCell className={classes.textSize_given} align="left">
                When
              </TableCell>
              <TableCell className={classes.textSize_given} align="left">
                Then
              </TableCell>
              
              <TableCell className={classes.textSize} align="right">
                Frontend
              </TableCell>
              <TableCell className={classes.textSize} align="right">
              Edit
            </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.fields.user}>
                <TableCell component="th" scope="row">
                  {row.fields.user}
                </TableCell>
                <TableCell align="center">{row.fields.given}</TableCell>
                <TableCell align="center">{row.fields.when}</TableCell>
                <TableCell align="center">{row.fields.then}</TableCell>
               
                <TableCell align="center">{row.fields.frontend_hours}</TableCell>
                <TableCell align="center"><a onClick={e=>editStories(row.pk)}>
                <EditIcon />
                </a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     

    </div>
  );
}
export default withRouter(ProjectView_userstories)
