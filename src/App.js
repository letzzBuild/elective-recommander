import React from 'react';
import Login from "./Pages/Login"
import DashBoard from "./Pages/Student/DashBoard";
import Helpme from "./Pages/Student/Helpme"
import ChooseElective from "./Pages/Student/ChooseElective"
import rating from "./Pages/Student/Faculty_Rating"

import './App.css';
import {BrowserRouter as Router, Link, Switch, Route, withRouter } from "react-router-dom";
import FacultyRating from './Pages/Student/Faculty_Rating';
import AddCollege from './Pages/Admin/Add_college';
import AddElective from './Pages/Admin/Add_elctive';
import AddUser from './Pages/Admin/Add_user';
import ElectiveInfo from './Pages/Admin/Elective_info';
import Electivescore from './Pages/Admin/ElectiveScore_data';
import FacultyDashboard from './Pages/Faculty/FacultyDashboard';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import About from './Pages/DashboardPages/about';

function App() {
  return (
    <div className="App">
      {/* <Login /> */}

      {/* <Signup /> */}
      {/* <DashBoard /> */}
      <Router>
        <Switch>
          <Route path="/Login" component={Login}></Route>
          <Route path="/dashboard" component={DashBoard}></Route>
          <Route path="/Helpme" component={Helpme}></Route>
          <Route path="/ChooseElective" component={ChooseElective}></Route>
          <Route path="/rating" component={FacultyRating}></Route>
          <Route path="/Faculty/FacultyDashboard" component={FacultyDashboard}></Route>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
