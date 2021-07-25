import React,{ useEffect, useState }from "react";
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
import AddBoxIcon from "@material-ui/icons/AddBox";
import StarHalfSharpIcon from "@material-ui/icons/StarHalfSharp";
import PersonIcon from "@material-ui/icons/Person";
import DoneIcon from "@material-ui/icons/Done";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import BUTTON from "../../reusableComponent/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useFormik } from "formik";
import Grid from "@material-ui/core/Grid";
import "../style.css";
import * as yup from "yup";
import axios from 'axios';
import { MenuItem } from "@material-ui/core";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import errorToast from "../../reusableComponent/errorToast";
import successToast from "../../reusableComponent/successToast";

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
  "/recommand"
 
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

export default function ChooseElective({ history }) {
  const [electives, setelectives] = useState([])
  const student_id = localStorage.getItem('student_id');  

  useEffect(() => {
    
    axios
      .get(`/electives/semelectives/student/${student_id}`)
      .then((response) => {
        console.log(response.data);
        setelectives(response.data)
      })
      .catch((err) => {
        console.log(err);
        errorToast("please try again")
      });
  }, []);
  

  const classes = useStyles();
  const schema =yup.object().shape({
    elective1:yup.string().required("Select option"),
    elective2:yup.string().required("Select option"),
    elective3:yup.string().required("Select option"),
    priority1:yup.string().required("Select option"),
    priority2:yup.string().required("Select option"),
    priority3:yup.string().required("Select option"),
  })

  const formik= useFormik({
    initialValues:{
      elective1:"",
      elective2:"",
      elective3:"",
      priority1:"",
      priority2:"",
      priority3:""
    },
    validationSchema:schema,
    onSubmit:(data)=>{
      var dataToSend = [];
      var dataobj={}
      console.log(data)
      for(let i=1;i<=3;i++)
      {
       dataobj['elective_name'] = data[`elective${i}`]
       dataobj['student_id'] = student_id
       dataobj['priority'] = data[`priority${i}`]
       dataToSend.push(dataobj)
       dataobj={}
      }
      axios.post('/electives/priority/',dataToSend).then((res)=>{
             console.log(res)
             successToast(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
  })

  return (
    console.log(formik),
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
            <Button  color="inherit">Logout</Button>
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
            <ListItemText primary={"Recommander"} />
          </ListItem>
          
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <form onSubmit={formik.handleSubmit}>
        <Typography paragraph>
          <div>
            <h1>Choose Elective</h1>
            <br/><br/>
            <Grid container spacing={4}>
            <Grid item xs={6}> 
            <h2>Select elective</h2>
            </Grid>
            <Grid item xs={6}> 
            <h2>Priority</h2>
            </Grid>
                 </Grid>
            
            <Grid container spacing={4}> 
          <Grid item xs={6}>
          <Select
                    style={{ width: 300, backgroundColor: "white" }}
                    size="small"
                    label="Choose elective 1"
                    variant="outlined"
                    name="elective1"
                    values={formik.values.elective1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.elective1}
                    touched={formik.touched.elective1}
                  >
                    {
                      electives.map((element) => <MenuItem key={element.elective_name} value={element.elective_name}>{element.elective_name}</MenuItem>)

                    }
                  </Select>
            </Grid>
            <Grid item xs={6}>
            <div>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="priority1"
                    defaultValue="top"
                    values={formik.values.priority1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.priority1}
                    touched={formik.touched.priority1}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label="1"
                      labelPlacement="Bottom"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio color="primary" />}
                      label="2"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio color="primary" />}
                      label="3"
                      labelPlacement="bottom"
                    />
                    
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>
            </Grid>
            <br/>
            <Grid container spacing={4}> 
           
            <Grid item xs={6}>
            <Select
                    style={{ width: 300, backgroundColor: "white" }}
                    size="small"
                    label="Choose Elective 2 "
                    variant="outlined"
                    name="elective2"
                    values={formik.values.elective2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.elective2}
                    touched={formik.touched.elective2}
                  >
                    {
                      electives.map((element) => <MenuItem key={element.elective_name} value={element.elective_name}>{element.elective_name}</MenuItem>)

                    }
                  </Select>
            </Grid>
            <Grid item xs={6}>
            <div>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="priority2"
                    defaultValue="top"
                    values={formik.values.priority2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.priority2}
                    touched={formik.touched.priority2}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label="1"
                      labelPlacement="Bottom"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio color="primary" />}
                      label="2"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio color="primary" />}
                      label="3"
                      labelPlacement="bottom"
                    />
                    
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>
            </Grid>
            <br/>
            <Grid container spacing={4}> 
           
           <Grid item xs={6}>
           <Select
                    style={{ width: 300, backgroundColor: "white" }}
                    size="small"
                    label="Choose Elective 3 "
                    variant="outlined"
                    name="elective3"
                    values={formik.values.elective3}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.elective3}
                    touched={formik.touched.elective3}
                  >
                    {
                      electives.map((element) => <MenuItem key={element.elective_name} value={element.elective_name}>{element.elective_name}</MenuItem>)

                    }
                  </Select>
           </Grid>
           <Grid item xs={6}>
           <div>
               <FormControl component="fieldset">
                 <RadioGroup
                   row
                   aria-label="position"
                   name="priority3"
                   defaultValue="top"
                   values={formik.values.priority3}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.priority3}
                    touched={formik.touched.priority3}
                 >
                   <FormControlLabel
                     value="1"
                     control={<Radio color="primary" />}
                     label="1"
                     labelPlacement="Bottom"
                   />
                   <FormControlLabel
                     value="2"
                     control={<Radio color="primary" />}
                     label="2"
                     labelPlacement="bottom"
                   />
                   <FormControlLabel
                     value="3"
                     control={<Radio color="primary" />}
                     label="3"
                     labelPlacement="bottom"
                   />
                   
                 </RadioGroup>
               </FormControl>
             </div>
           </Grid>
           </Grid>
           <br/>
           
           <br/> <br/>
           <BUTTON 
           isdisabled={!(formik.dirty && formik.isValid)}
            type="submit"  
            title="Submit" />
              
                     </div>
                     
        </Typography>
        </form>
      </main>
    </div>
  );
}
