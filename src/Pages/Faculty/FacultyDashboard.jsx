import React,{useState,useEffect} from 'react';
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
import errorToast from "../../reusableComponent/errorToast";
import successToast from "../../reusableComponent/successToast";




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


  const [facultyElectives, setfacultyElectives] = useState(null)
 
  const [selectedpdf, setselectedpdf] = useState(null)
  const [selectedVideo, setselectedVideo] = useState(null)

  const faculty_id = localStorage.getItem('faculty_id')

  useEffect(() => {
    axios.post('electives/assigned/faculty/',{"faculty_id":faculty_id}).then((res)=>{
       console.log(res)
       setfacultyElectives(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])

 

  const schema = yup.object().shape({
    elective_id: yup.number().required('this field is required'),
    company_names: yup.string().required('this field is required'),
    total_intake: yup.number().required('this field is required'),
    scope: yup.string().required('this field is required'),
    prerequisites: yup.string().required('this field is required'),
  });


  const formik = useFormik(
    {
      initialValues: {
        elective_id:0,
        total_intake:0,
        scope:'',
        prerequisites:'',
        company_names: '',
        


      },
      onSubmit: (data) => {
        console.log("submitted")
        console.log(data);
        const formData = new FormData();
        formData.append('elective_id',data.elective_id)
        formData.append('total_intake',data.total_intake)
        formData.append('scope',data.scope)
        formData.append('prerequisites',data.prerequisites)
        formData.append('company_names',data.company_names)
        formData.append('syllabus_pdf',selectedpdf)
        formData.append('introduction_video',selectedVideo)
        axios({
          url: '/electives/upload/electiveinfo/',
          method: 'post',
          data: formData,
        }).then((response) => {
          successToast("successfully recorded elective information")
          console.log(response)
          handleClose()
          

        }).catch((error) => {
          console.log(error)
          errorToast("something went wrong");
          handleClose()
        })


      },

      validationSchema: schema,
      
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
    console.log(selectedVideo),
    <div >
      <div className={classes.root} style={{padding:10}} >
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
      <div className="teacher-dashboard" style={{padding:50}} >

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
                    {facultyElectives && facultyElectives.map((row) => (
                      <TableRow key={row.elective_name}>
                        <TableCell component="th" scope="row">
                          <h3>{row.elective_name}</h3>
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
                      <TableCell ><div style={{ fontSize: 20, textAlign: "center", fontFamily: "italic" }}>Add Elective Information</div></TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {facultyElectives && facultyElectives.map((row) => (
                      <TableRow key={row.elective_id}>
                        <TableCell style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} component="th" scope="row" size="small" >
                          <h3 style={{padding:10}}>{row.elective_name}</h3>
                          
                          <h4 style={{padding:10}}>Elective Id : {row.elective_id}</h4>
                          <Button style={{padding:10,width:300,height:50,paddingLeft:30,marginTop:10}} variant="contained" color="primary" className="teacherButton" disableElevation onClick={handleOpen}>
                            Add
                          </Button>
                          <>
          
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
                                      <h2 id="transition-modal-title">Add Elective Info</h2>
                                      <form onSubmit={formik.handleSubmit} >
                                       <div className="textdiv">
                                        <label>Elective Id :</label>
                                        <TextField
                                          label="elective id"
                                          variant="outlined"
                                          name="elective_id"
                                          onChange={formik.handleChange}
                                          value={formik.values.elective_id}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.elective_id}
                                          touched={formik.touched.elective_id}
                                          
                                        />
                                      </div>

                                      <div className="textdiv">
                                        <label>Scope of Subject:</label>
                                        <TextField
                                          label="Scope of Subject"
                                          variant="outlined"
                                          name="scope"
                                          onChange={formik.handleChange}
                                          value={formik.values.scope}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.scope}
                                          touched={formik.touched.scope}
                                        />
                                      </div>
                                      <div className="textdiv">
                                        <label>Job opportunities:</label>
                                        <TextField
                                          label="Job opportunities"
                                          variant="outlined"
                                          name="company_names"
                                          onChange={formik.handleChange}
                                          value={formik.values.company_names}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.company_names}
                                          touched={formik.touched.company_names}
                                        />
                                      </div >
                                      <div className="textdiv">
                                        <label>Total Intake</label>
                                        <TextField
                                          label="Total Intake"
                                          variant="outlined"
                                          name="total_intake"
                                          onChange={formik.handleChange}
                                          value={formik.values.total_intake}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.total_intake}
                                          touched={formik.touched.total_intake}
                                        />
                                      </div>
                                      <div className="textdiv">
                                        <label>Prerequisites</label>
                                        <TextField
                                          label="Prerequisites"
                                          variant="outlined"
                                          name="prerequisites"
                                          onChange={formik.handleChange}
                                          value={formik.values.prerequisites}
                                          onBlur={formik.handleBlur}
                                          error={formik.errors.prerequisites}
                                          touched={formik.touched.prerequisites}
                                        />
                                      </div>
                                
                                      <div className="textdiv">
                                        <label>Add Video:</label>

                                        <TextField
                                         required
                                          type="file"
                                          name="introduction_video"
                                          onChange={(e)=>{setselectedVideo(e.target.files[0])}}
                                          
                                        />
                                      </div>
                                      <div className="textdiv">
                                        <label>Add Syllabus Copy:</label>
                                        {/* <h3 style={{marginRight:"20px"}}>Syllabus(pdf):</h3> */}
                                        <TextField
                                          name="syllabus_pdf"
                                          type="file"
                                          required
                                          variant="outlined"
                                          onChange={(e)=>{setselectedpdf(e.target.files[0])}}
                                          
                                        />
                                      </div>
                                      <center>
                                        <Button variant="contained" type="submit" color="primary" style={{ marginTop: 8 }} >
                                          Submit
                                        </Button></center>
                                        </form>
                                    </div>
                                  </Fade>
                                </Modal>

                              </div>
                            
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

            <div className="rating-item1"><h5>Average Rating of Faculty</h5><hr />
            <h3>{facultyElectives ? facultyElectives[0].average_rating.stars__avg:0} Stars</h3>
            </div>
          </div>

        </div>
      </div>
      <br></br>
      
    </div>



  );
}
