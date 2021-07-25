import React, { useState } from 'react'
import Heading from "../reusableComponent/Heading";
import TextField from "../reusableComponent/TextField.jsx"
import errorToast from "../reusableComponent/errorToast";
import successToast from "../reusableComponent/successToast";
import Button from "../reusableComponent/Button"
import "../Pages/style.css"
import { BrowserRouter as Router, Link, Switch, Route, withRouter } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Loader from "../reusableComponent/Loader.jsx";




function Login() {
  const history = useHistory();
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState(true)
  }

  var variable1;

  const schema = yup.object().shape({
    email: yup.string().required('This field is required'),
    password: yup.string().required().min(4, 'Create a strong password'),

  });
  const formik = useFormik(
    {
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: (data) => {
        console.log(data);
        setState(true);
          axios({
            url: '/users/login/',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: data
          }).then((response) => {
            console.log(response)
            setState(false)

            if (response.status === 200) {
              variable1 = localStorage.setItem("refresh", response.data.refresh);
              console.log(localStorage.getItem(variable1));
              localStorage.setItem("access", response.data.access);
              localStorage.setItem("username", response.data.username);
              localStorage.setItem("email", response.data.email);
              localStorage.setItem("dob", response.data.dob);
              localStorage.setItem("gender", response.data.gender);
              localStorage.setItem("role", response.data.role);
              
              


              if (response.data.role === "none") {
                errorToast("You are neither a student nor a faculty member");
              }
              if (response.data.role === "student") {
                localStorage.setItem("student_id",response.data.student_id)
                successToast("successfully login");
                history.push("/dashboard")
              }
              if (response.data.role === "faculty") {
                localStorage.setItem("faculty_id",response.data.faculty_id)
                successToast("successfully login");
                history.push("/Faculty/FacultyDashboard")
              }
            }

          }).catch((error) => {
            console.log(error.response)

            if (error.response.status === 401) {
              errorToast(error.response.data.detail);
            }
          })
      },
    }
  )


  return (
    <div>
      {
        state ?
          <div>
            <Loader />
          </div>
      :
      
        <div className="app" >

          <div className="log-div" >

            <Heading
              data="Login"

            />
            <br />

            <form onSubmit={formik.handleSubmit}>


              <TextField
                width={300}
                label="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.errors.email}
                touched={formik.touched.email}
              />
              <br />

              <TextField
                width={300}
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
                type="submit"
                title="Login" onClick={handleClick}
                width={300}
              />
              


            </form>

            {/* <ToastContainer /> */}
          </div>
        </div>

      }
    </div>
  )
}

export default Login
