import React,{useEffect} from "react";
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
import Select from '@material-ui/core/Select';
import BUTTON from "..//..//reusableComponent/Button";
import Grid from "@material-ui/core/Grid";
import Chart from "react-google-charts";
import "../style.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";

const drawerWidth = 240;

const icons = [
  <LocalLibraryIcon />,
  <AddBoxIcon />,
  <DoneIcon />,
  <StarHalfSharpIcon />,
  <PersonIcon />,
];


//const Subjects = ["Java", "python", "Data Structure"];

const data = [{ "elective_id": 1, "elective_name": "internet of things", "elective_short_name": "IOT" },
{ "elective_id": 2, "elective_name": "advance java", "elective_short_name": "AdvJAVA" }]

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

export default function Helpme({ history }) {
  const classes = useStyles();

  useEffect(() => {
    axios
       .get('/electives/allelectives')
       .then((response) => {
      console.log(response.data)
    })
    .catch(err=>{
      console.log(err)
    })
},[])

  const schema = yup.object().shape({
    sem: yup.string().required('Select the field'),
  })

  const formik = useFormik({
    initialValues: {
      sem: "",
    },
    validationSchema: schema,
    
  }
  )

  return (console.log(formik),
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
          <form onSubmit={formik.handleSubmit}>
            <div className="helpme-main-div">
              <h3>Select elective</h3>
              <Grid container spacing={10}>
                <Grid item xs={6}>
                  <Select
                    style={{ width: 300, backgroundColor: "white" }}
                    size="small"
                    label="select subject"
                    variant="outlined"
                    name="sem"
                    values={formik.values.sem}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.sem}
                    touched={formik.touched.sem}
                  >
                    {
                      data.map((element) => <MenuItem key={element.elective_short_name} value={element.elective_id}>{element.elective_name}</MenuItem>)

                    }
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <BUTTON title="submit" width="250px" isdisabled={(!formik.dirty && formik.isValid)} 
                    />
                </Grid>
              </Grid>
              <br /><br />





              <div>

                <Chart
                  width={"600px"}
                  height={"400px"}
                  chartType="Scatter"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["Student ID", "Hours Studied", "Final"],
                    [0, 0, 67],
                    [1, 1, 88],
                    [2, 2, 77],
                    [3, 3, 93],
                    [4, 4, 85],
                    [5, 5, 91],
                    [6, 6, 71],
                    [7, 7, 78],
                    [8, 8, 93],
                    [9, 9, 80],
                    [10, 10, 82],
                    [11, 0, 75],
                    [12, 5, 80],
                    [13, 3, 90],
                    [14, 1, 72],
                    [15, 5, 75],
                    [16, 6, 68],
                    [17, 7, 98],
                    [18, 3, 82],
                    [19, 9, 94],
                    [20, 2, 79],
                    [21, 2, 95],
                    [22, 2, 86],
                    [23, 3, 67],
                    [24, 4, 60],
                    [25, 2, 80],
                    [26, 6, 92],
                    [27, 2, 81],
                    [28, 8, 79],
                    [29, 9, 83],
                  ]}
                  options={{
                    // Material design options
                    chart: {
                      title: "Analysis of previous student marks",
                      subtitle: "based on hours studied",
                    },
                    width: 700,
                    height: 400,

                    series: {
                      0: { axis: "hours studied" },
                      1: { axis: "final grade" },
                    },
                    axes: {
                      y: {
                        "hours studied": { label: "Hours Studied" },
                        "final grade": { label: "Final Exam Grade" },
                      },
                    },
                  }}
                  rootProps={{ "data-testid": "4" }}
                  legendToggle
                />
              </div>
              <br /><br />
              <div className="helpme-dashboard">
                <div className="helepme-head"><h3>Detail analysis of the elective choosen</h3></div>
                <br />
                <div className="helpme-div">
                  <div className="helpme-item1"><h5>Subject Name</h5>
                    <hr /></div>
                  <div className="helpme-item1"><h5>Faculty Name</h5><hr /></div>
                  <div className="helpme-item1"><h5>Ratings</h5><hr /></div>
                  <div className="helpme-item1"><h5>Scope of Subject</h5><hr /></div>
                </div>
                <br />
                <div className="helpme-div">
                  <div className="helpme-item2"><h5>Syllabus</h5><hr /></div>
                  <div className="helpme-item2"><h5>Companies</h5><hr /></div>
                  <div className="helpme-item2">Add video</div>

                </div>
                <br />
                <div className="helpme-div">
                  <div className="helpme-item2"><h5>prerequists</h5><hr /></div>
                  <div className="helpme-item2"><h5>Your predicted Score</h5><hr /></div>
                  <div className="helpme-item2"><h5>Total Intake</h5><hr /></div>

                </div>

              </div>
            </div>

          </form>
        </Typography>
      </main>
    </div>
  );
}
