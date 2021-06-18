import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import "../style.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import Select from "../../reusableComponent/DropDown.jsx";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "../../reusableComponent/TextField"
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';




const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,

  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);










const Subjects = ["Java", "python", "Data Structure"];



function createData(name) {
  return { name };
}

const rows = [
  createData('python'),
  createData('java02'),
];

function createData1(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows1 = [
  createData1('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData1('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData1('Eclair', 262, 16.0, 24, 6.0),

];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  table1: {
    minWidth: 500,
  },
  table2: {
    minWidth: 650,
  },
  root1: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: 200,
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6, 12, 9),
  },
  table: {
    minWidth: 700,
  },
}));

export default function ButtonAppBar() {

  localStorage.setItem('IS_LOGGED_IN', 'false')
  console.log(localStorage.getItem('IS_LOGGED_IN'));

  // const userType = ['student', 'faculty', 'admin']

  const schema = yup.object().shape({
    subjectcode: yup.string().required('this field is required'),
    scopeofsubject: yup.string().required('this field is required'),
    futurecomponies: yup.string().required('this field is required'),
    totalmarks: yup.string().required('this field is required'),
    syllabus: yup.string().required('PDF file is not choose'),
    video: yup.string().required('video is not choosen')
  });


  const formik = useFormik(
    {
      initialValues: {
        subjectCode: '',
        scopeofSubject: '',
        futurecomponies: '',
        totalMarks: '',

      },
      onSubmit: (data) => {
        console.log(data);
        axios({
          url: 'http://127.0.0.1:5000//Faculty/FacultyDashboard',
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          data: data
        }).then((response) => {
          console.log(response)
          // if (response.data.message === "valid user")
          //     successToast("successfully login");
          // else
          //     errorToast("Invalid user name or password");

          if (response.data.status === 1) {
            localStorage.setItem('IS_LOGGED_IN', 'true')
            console.log(localStorage.getItem('IS_LOGGED_IN'));
          }
          else {
            localStorage.setItem('IS_LOGGED_IN', 'false')
          }



        }).catch((error) => {
          console.log(error)
          // errorToast("something went wrong");
        })


      },

      validationSchema: schema,
      onSubmit: (data) => {
        console.log(data)
      }
    })




  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    console.log(formik),
    <div>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <div className="nav-item1">
              <Typography variant="h6" noWrap>
                Faculty DashBoard
              </Typography>
            </div>
            <div>
              <Button color="inherit" onClick={() => history.push("/Login")}>Logout</Button>
            </div>
          </Toolbar>
        </AppBar>
      </div >
      <div className="teacher-dashboard">

        <div className="teacher-div">
          <Grid iteam xs={5}>
            <div  >
              <TableContainer component={Paper}>
                <Table className={classes.table1} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell><div style={{ fontSize: 20, textAlign: "center", fontFamily: "italic" }}>Allocated Electives</div></TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </div>
          </Grid>
          <Grid iteam xs={8}>
            <div className="teacher-div2">
              <TableContainer component={Paper}>
                <Table className={classes.table2} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell ><div style={{ fontSize: 20, textAlign: "center", fontFamily: "italic" }}>Add Elective Imformation</div></TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} component="th" scope="row" size="small" >
                          {row.name}
                          <Button variant="contained" color="primary" className="teacherButton" disableElevation onClick={handleOpen}>
                            Add
                          </Button>
                          <>
                            <form onSubmit={formik.handleSubmit} >
                              <div className={classes.root}>
                                <Modal
                                  aria-labelledby="transition-modal-title"
                                  aria-describedby="transition-modal-description"
                                  className={classes.modal}
                                  open={open}
                                  onClose={handleClose}
                                  closeAfterTransition
                                  BackdropComponent={Backdrop}
                                  BackdropProps={{
                                    timeout: 500,
                                  }}
                                >
                                  <Fade in={open}>
                                    <div className={classes.paper}>
                                      <h2 id="transition-modal-title">Add Subjects!!</h2>
                                      {/* <form onSubmit={formik.handleSubmit} >
                                        <div className={classes.root}> */}
                                      <div className="textdiv">
                                        <label >Subject Code:</label>
                                        <TextField
                                          label="Subject Code"
                                          variant="outlined"
                                          name="subjectcode"
                                          onChange={formik.handleChange}
                                          value={formik.values.usn}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.usn}
                                          touched={formik.touched.usn}
                                        />
                                      </div>
                                      <div className="textdiv">
                                        <label>Scope of Subject:</label>
                                        <TextField
                                          label="Scope of Subject"
                                          variant="outlined"
                                          name="scopeofsubject"
                                          onChange={formik.handleChange}
                                          value={formik.values.usn}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.usn}
                                          touched={formik.touched.usn}
                                        />
                                      </div>
                                      <div className="textdiv">
                                        <label>Future componies:</label>
                                        <TextField
                                          label="Future componies"
                                          variant="outlined"
                                          name="futurecomponies"
                                          onChange={formik.handleChange}
                                          value={formik.values.usn}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.usn}
                                          touched={formik.touched.usn}
                                        />
                                      </div >
                                      <div className="textdiv">
                                        <label>Total Marks:</label>
                                        <TextField

                                          label="Total Marks"
                                          variant="outlined"
                                          name="totalmarks"
                                          onChange={formik.handleChange}
                                          value={formik.values.usn}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.usn}
                                          touched={formik.touched.usn}
                                        />
                                      </div>
                                      <div className="textdiv">
                                        <label>Add Video:</label>

                                        <TextField
                                          type="file"
                                          name="video"

                                          variant="outlined"
                                          onChange={formik.handleChange}
                                          value={formik.values.usn}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.usn}
                                          touched={formik.touched.usn}
                                        />
                                      </div>
                                      <div className="textdiv">
                                        <label>Add Syllabus:</label>
                                        {/* <h3 style={{marginRight:"20px"}}>Syllabus(pdf):</h3> */}
                                        <TextField
                                          name="syllabus"
                                          type="file"

                                          variant="outlined"
                                          onChange={formik.handleChange}
                                          value={formik.values.usn}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.usn}
                                          touched={formik.touched.usn}
                                        />
                                      </div>
                                      <center>
                                        <Button variant="contained" color="primary" style={{ marginTop: 8 }} disableElevation>
                                          Submit
                                        </Button></center>
                                    </div>
                                  </Fade>
                                </Modal>

                              </div>
                            </form>
                          </>
                          <Button variant="contained" color="primary" className="teacherButton" disableElevation onClick={handleOpen} >
                            Update
                          </Button>
                          <>
                            <form onSubmit={formik.handleSubmit} >
                              <div className={classes.root}>
                                <Modal
                                  aria-labelledby="transition-modal-title"
                                  aria-describedby="transition-modal-description"
                                  className={classes.modal}
                                  open={open}
                                  onClose={handleClose}
                                  closeAfterTransition
                                  BackdropComponent={Backdrop}
                                  BackdropProps={{
                                    timeout: 500,
                                  }}
                                >
                                  <Fade in={open}>
                                    <div className={classes.paper}>
                                      <h2 id="transition-modal-title">Add Subjects!!</h2>
                                      {/* <form onSubmit={formik.handleSubmit} >
                                        <div className={classes.root}> */}
                                      <div className="textdiv">
                                        <label >Subject Code:</label>
                                        <TextField
                                        
                                        defaultValue="18cs61"
                                         label="Subject Code"
                                          variant="outlined"
                                          name="subjectcode"
                                          
                                          onChange={formik.handleChange}
                                          value={formik.values.subjectcode}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.subjectcode}
                                          touched={formik.touched.subjectcode}
                                        />
                                      </div>
                                      <div className="textdiv">
                                        <label>Scope of Subject:</label>
                                        <TextField
                                          label="Scope of Subject"
                                          variant="outlined"
                                          name="scopeofsubject"
                                          defaultValue="XYZ"
                                          onChange={formik.handleChange}
                                          value={formik.values.scopeofsubject}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.scopeofsubject}
                                          touched={formik.touched.scopeofsubject}
                                        />
                                      </div>
                                      <div className="textdiv">
                                        <label>Future componies:</label>
                                        <TextField
                                          label="Future componies"
                                          variant="outlined"
                                          name="futurecomponies"
                                          defaultValue="HP"
                                          onChange={formik.handleChange}
                                          value={formik.values.futurecomponies}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.futurecomponies}
                                          touched={formik.touched.futurecomponies}
                                        />
                                      </div >
                                      <div className="textdiv">
                                        <label>Total Marks:</label>
                                        <TextField

                                          label="Total Marks"
                                          variant="outlined"
                                          name="totalmarks"
                                          defaultValue="63"
                                          onChange={formik.handleChange}
                                          value={formik.values.totalmarks}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.totalmarks}
                                          touched={formik.touched.totalmarks}
                                        />
                                      </div>
                                      <div className="textdiv">
                                        <label>Add Video:</label>

                                        <TextField
                                          type="file"
                                          name="video"
                                          width={222}
                                          variant="outlined"
                                          onChange={formik.handleChange}
                                          value={formik.values.video}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.video}
                                          touched={formik.touched.video}
                                        />
                                      </div>
                                      <div className="textdiv">
                                        <label>Add Syllabus:</label>
                                        {/* <h3 style={{marginRight:"20px"}}>Syllabus(pdf):</h3> */}
                                        <TextField
                                          name="syllabus"
                                          width={222}
                                          type="file"                                         
                                          variant="outlined"
                                          onChange={formik.handleChange}
                                          value={formik.values.file}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.file}
                                          touched={formik.touched.file}
                                        />
                                      </div>
                                      <center>
                                        <Button variant="contained" color="primary" style={{ marginTop: 8 }} disableElevation
                                        type="submit"
                                        title="submit"
                                        disabled={!formik.dirty && !formik.isValid}>
                                          Submit
                                        </Button></center>
                                    </div>
                                  </Fade>
                                </Modal>

                              </div>
                            </form>
                          </>

                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer></div>
          </Grid>
        </div>
        <br></br>

        <div>
          <div className="helpme-div">

            <div className="rating-item1"><h5>Average Rating</h5><hr /></div>
            <div className="subject-item2"><h5>Select Elective Subject</h5><hr />
              <Select
                data={Subjects}
                width={300}
                label="Select"
                name="subject2"
                style={{ lineHeight: 1 }}
              ></Select>
            </div>

          </div>

        </div>
      </div>
      <br></br>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>USN</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Subject</StyledTableCell>
              <StyledTableCell align="right">Project</StyledTableCell>
              <StyledTableCell align="right">Sem</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows1.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>



  );
}
