import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Menu from "@material-ui/core/Menu";
// import Logo from "./assests/logo.png";
import MoreIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { withRouter } from "react-router-dom";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { AddCircleOutline } from "@material-ui/icons";
import Images from "./assets/add@3x.png";
import Card from "@material-ui/core/Card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
// import {BrowserRouter,Route,withRouter} from 'react-router-dom';
import { getThemeProps } from "@material-ui/styles";

const drawerWidth = 175;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  iconcolor: {
    color: "grey"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "#ffffff"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  col: {
    color: "#96cbff",
    // borderRadius: 50,
    // boxShadow: "0 3px 6px 0 ",
    // paddingTop: 10,
    // paddingBottom: 10,
    ObjectFit: "contained",
    marginLeft: 25,
    marginTop: 30,
    width: 35,
    height: 35,
    cursor: "pointer"
  },
  button: {
    margin: theme.spacing(1),
    color: "grey"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    },
    color: "grey"
  },
  grow: {
    flexGrow: 1
  },
  font: {
    fontFamily: "Roboto",
    fontSize: 28
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  card: {
    maxWidth: 215,
    display: "flex",
    display: "inline-block",
    padding: "auto"
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  color: {
    color: "#000000",
    fontFamily: "Roboto medium",
    // lineHeight: 2.2,
    fontSize: 26,
    // padding: 10,
    backgroundColor: "#f3f3f3"
  },
  font: {
    backgroundColor: "#96cbff",
    color: "white"
  },
  new: {
    float: "right"
  },
  span: {
    position: "center",
    fontSize: 16,
    fontFamily: "Roboto",
    marginBottom: 10
  },
  add: {
    fontSize: 20,
    fontFamily: "Roboto regular"
  }
}));

function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [color, setColor] = useState([]);
  const [displayform, setDisplayform] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const LogoutHandler = () => {
    if(window.confirm("are you sure you want to logout!"))       
      {     
         localStorage.clear();   
            props.history.push("./");  
              }      
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Button size="small" className={classes.button}>
          <SettingsIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
          Settings
        </Button>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Button size="small" className={classes.button} onClick={LogoutHandler}>
          <ExitToAppRoundedIcon
            className={clsx(classes.leftIcon, classes.iconSmall)}
          />
          Logout
        </Button>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  //   useEffect(() => {
  //     let headers = {
  //       "Content-Type": "multipart/form-data"
  //     };
  //     const fetchData = async () => {
  //       const result = await axios(ADDPROJECT_URL, { headers });
  //       setData(result.data);
  //     };
  //     fetchData();
  //   }, []);

  function add() {
    console.log("data");
    setDisplayform(true);
  }

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(
              classes.menuButton,
              open && classes.hide,
              classes.iconcolor
            )}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button className={classes.button}>search</Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              className={classes.iconcolor}
              aria-label="show red dot"
              color="inherit"
            >
              <Badge color="red">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>
          <IconButton
            edge="end"
            aria-label="account of current user"
            color="inherit"
            className={classes.iconcolor}
            onClick={handleProfileMenuOpen}
            aria-label="show more"
            // aria-controls={mobileMenuId}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="row">
        <div className="col s1">
          
        </div>
        <div className="col s11"></div>
      </div>
      {renderMobileMenu}
      {renderMenu}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography className={classes.color}>
            {/* <img src={Logo} alt="" /> */}
            <span className={classes.font}>F</span>riday
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <span className={classes.span}>
          <img className={classes.col} src={Images} onClick={add} alt="" />
          <span className={classes.add}> Add project</span>
        </span>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}

export default withRouter(PersistentDrawerLeft);
