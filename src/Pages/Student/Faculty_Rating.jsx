import React, { useState } from "react";
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
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import BUTTON from "..//..//reusableComponent/Button";
import { useFormik } from "formik";
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";

import * as yup from "yup";

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
  "/rating",
  "/about",
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

export default function FacultyRating({ history }) {
  const classes = useStyles();

  const ratings = [1, 2, 3, 4, 5];

  const elective_subject = [
    {
      elective_name: "Java",
      elective_id: 1,
    },
    {
      elective_name: "Computer Graphics",
      elective_id: 2,
    },
    {
      elective_name: "IoT",
      elective_id: 3,
    },
    {
      elective_name: "Python",
      elective_id: 4,
    },
  ];

  const schema = yup.object().shape({
    elective_name: yup.string().required("This field is required"),
    rating: yup.string().required("This field is required"),
    comments: yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      elective_name: "",
      rating: "",
      comments: "",
    },
    validationSchema: schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

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

          <ListItem button key={1} onClick={() => history.push(routes[4])}>
            <ListItemIcon>{icons[4]}</ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          <h1>This is rating page</h1>
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <div className="rating_fields">
            {/* 
        <TextField
            select
            style={{ width: 400,marginBottom:16 }}
            label="Elective Name"
            variant="outlined"
            placeholder="Elective Name"
            name="elective_name"
            data={ratings}
            onBlur={formik.handleBlur}
               error={formik.errors.elective_name}
               touched={formik.touched.elective_name}
               onChange={formik.handleChange}
          >
            {elective_subject.map((ele) => (
              <MenuItem key={ele} value={ele.elective_id}>
                {ele.elective_name}
              </MenuItem>
            ))}
          </TextField>


          <TextField
            select
            style={{ width: 400,marginBottom:16 }}
            label="Rating"
            variant="outlined"
            placeholder="Rating"
            name="rating"
            data={ratings}
            onBlur={formik.handleBlur}
               error={formik.errors.rating}
               touched={formik.touched.rating}
               onChange={formik.handleChange}
          >
            {ratings.map((ele) => (
              <MenuItem key={ele} value={ele}>
                {ele}
              </MenuItem>
            ))}
          </TextField> */}
        <InputLabel >Elective name</InputLabel>
            <Select
              style={{ width: 400 }}
              id="demo-simple-select-filled"
              size="small"
              label="Elective Name"
              variant="outlined"
              name="sem"
              placeholder="Elective Name"
              values={formik.values.elective_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.elective_name}
              touched={formik.touched.elective_name}
            >
              {elective_subject.map((ele) => (
                <MenuItem key={ele} value={ele.elective_id}>
                  {ele.elective_name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              variant="outlined"
              multiline
              rows={4}
              name="comments"
              label="Comments"
              style={{ width: 400, marginBottom: 16 }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.comments}
              touched={formik.touched.comments}
            />

            <BUTTON title="Submit" />
          </div>
        </form>
      </main>
    </div>
  );
}
