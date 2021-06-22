import React, { useState } from 'react'
import Heading from "../reusableComponent/Heading";
import TextField from "../reusableComponent/TextField.jsx"
import errorToast from "../reusableComponent/errorToast";
import successToast from "../reusableComponent/successToast";
import { ToastContainer } from 'react-toastify';
import Button from "../reusableComponent/Button"
import "../Pages/style.css"
import { BrowserRouter as Router, Link, Switch, Route, withRouter } from "react-router-dom";
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import Container from '@material-ui/core/Container';
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Loader from "../reusableComponent/Button";




function Login() {
  const history = useHistory();
  const [state, setState] = useState(false);
  var variable1;

  const schema = yup.object().shape({
    usn: yup.string().required('This field is required'),
    password: yup.string().required().min(4, 'Create a strong password'),

  });
  const formik = useFormik(
    {
      initialValues: {
        usn: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: (data) => {
        console.log(data);
        setState(true);
        axios({
          url: 'http://localhost:8000/users/login/',
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          data: data
        }).then((response) => {
          console.log(response)
          setState(false)

          if (response.data.status === 401) {
            errorToast(response.data.detail);
          }
          if (response.data.status === 200) {
            successToast("successfully login");
            variable1 = localStorage.setItem("refresh",response.data.refresh);
            console.log(localStorage.getItem(variable1));
            localStorage.setItem("access",response.data.access);
            localStorage.setItem("username",response.data.username);
            localStorage.setItem("email",response.data.email);
            localStorage.setItem("dob",response.data.dob);
            localStorage.setItem("gender",response.data.gender);
            localStorage.setItem("role",response.data.role);
          }
          if (response.data.role === "none") {
            errorToast("You are neither a student nor a faculty member");
            history.push("/");
          }
          if (response.data.role === "student") {
            history.push("/dashboard")
          }
          if (response.data.role === "faculty") {
            history.push("/Faculty/FacultyDashboard")
          }


        }).catch((error) => {
          console.log(error)
          errorToast("something went wrong,Check with your connection");
        })
      },
    }
  )


  return (
    <div>
      {
        state === "true" &&
        <div>
          <Loader />
        </div>
      }
      {

        console.log(formik),
        <div className="app" >

          <div className="log-div" >

            <Heading
              data="Login"

            />
            <br />

            <form onSubmit={formik.handleSubmit}>


              <TextField
                label="usn"
                name="usn"
                onChange={formik.handleChange}
                value={formik.values.usn}
                onBlur={formik.handleBlur}
                error={formik.errors.usn}
                touched={formik.touched.usn}
              />
              <br />

              <TextField
                label="Password"
                name="password"
                onChange={formik.handleChange}
                values={formik.values.password}
                onBlur={formik.handleBlur}
                error={formik.errors.password}
                touched={formik.touched.password}
              //   type="password"
              />
              <br />
              <a href='forgotpasslink ' style={{ float: "right" }}>Forgot Password?</a><br /><br />

              <Button
                //  isdisabled={!(formik.dirty && formik.isValid)}
                title="Login" onClick={setState} />
              <Link to="/Signup"><h5>Don't have account? SignUp</h5></Link>


            </form>

            <ToastContainer />
          </div>
        </div>

      }
    </div>
)
}

export default Login
