import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import AddBoxIcon from "@material-ui/icons/AddBox";
import StarHalfSharpIcon from "@material-ui/icons/StarHalfSharp";
import PersonIcon from "@material-ui/icons/Person";
import DoneIcon from "@material-ui/icons/Done";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Cards from "./studentCard.jsx";
import axios from "axios";
import "../style.css";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";

const drawerWidth = 240;

const icons = [
  <LocalLibraryIcon />,
  <AddBoxIcon />,
  <DoneIcon />,
  <StarHalfSharpIcon />,
  <PersonIcon />,
];

const routes = [
  "/dashboard",
  "/Helpme",
  "/ChooseElective",
  "/rating"
];
const colors = [
  "#fce4ec",
  "#e3f2fd",
  "#f0f4c3",
  "#b9f6ca",
  "#d1c4e9",
  "#ccff90",
];


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft({ history }) {
  const classes = useStyles();


  const [studentCard,setStudentCard] = useState([]);

  useEffect(() => {
    const student_id = localStorage.getItem('student_id');
    axios
      .get(`/ratings/student/home/${student_id}/`)
      .then((response) => {
        console.log(response.data);
        setStudentCard(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className="nav-item1">
            <Typography variant="h6" noWrap>
              Student DashBoard
            </Typography>
          </div>

          <div className="nav-item2">
            <IconButton>
              <Avatar src="/broken-image.jpg">H</Avatar>
            </IconButton>
          </div>
          <div>
            <Button color="inherit">Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button key={0} onClick={() => history.push(routes[0])}>
            <ListItemIcon>{icons[0]}</ListItemIcon>
            <ListItemText primary={"Elective"} />
          </ListItem>

          <ListItem button key={1} onClick={() => history.push(routes[1])}>
            <ListItemIcon>{icons[1]}</ListItemIcon>
            <ListItemText primary={"Help Me"} />
          </ListItem>

          <ListItem button key={1} onClick={() => history.push(routes[2])}>
            <ListItemIcon>{icons[2]}</ListItemIcon>
            <ListItemText primary={"Choose Elective"} />
          </ListItem>

          <ListItem button key={1} onClick={() => history.push(routes[3])}>
            <ListItemIcon>{icons[3]}</ListItemIcon>
            <ListItemText primary={"Rate Faculty"} />
          </ListItem>

          
        </List>
        <Divider />
      </Drawer>
      {/* <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <Typography paragraph> */}
      {/* <div main-div style={{ width: "100vh", height: "800px", marginTop: "40px", padding: "10px" }}>


          <Grid container spacing={2}>
            <Grid item xs>
              <div style={{ backgroundColor: '#e1bee7', width: "220px", height: "200px" }}></div>
            </Grid>
            <Grid item xs>
              <div style={{ backgroundColor: '#90caf9', width: "220px", height: "200px" }}></div>
            </Grid>

            <Grid item xs>
              <div style={{ backgroundColor: '#f06292', width: "220px", height: "200px" }}></div>
            </Grid>

          </Grid>
          <br /><br /><br />
          <Grid container spacing={2}>
            <Grid item xs>
              <div style={{ backgroundColor: '#f0f4c3', width: "220px", height: "200px" }}></div>
            </Grid>
            <Grid item xs>
              <div style={{ backgroundColor: '#69f0ae', width: "220px", height: "200px" }}></div>
            </Grid>

            <Grid item xs>
              <div style={{ backgroundColor: '#b39ddb', width: "220px", height: "200px" }}></div>
            </Grid>

          </Grid>

        </div> */}
      {/* </Typography> */}

      {/* </main> */}
      <div className="dashcontainer">
        {studentCard.map((element, i) => (
          <div className="up-cardcontainer">
            <Cards
              key={i}
              color={colors[i]}
              sub={element.elective_name}
              faculty={element.faculty_name}
              rating={element.ratings}
            ></Cards>
          </div>
        ))}
      </div>
    </div>
  );
}
