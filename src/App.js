import React from 'react';
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import DashBoard from "./Pages/Student/DashBoard";
import About from "./Pages/Student/About"
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
          <Route path="/Signup" component={Signup}></Route>
          <Route path="/dashboard" component={DashBoard}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/Helpme" component={Helpme}></Route>
          <Route path="/ChooseElective" component={ChooseElective}></Route>
          <Route path="/rating" component={FacultyRating}></Route>
          <Route path="/admin/Add_college" component={AddCollege}></Route>
          <Route path="/admin/Add_elective" component={AddElective}></Route>
          <Route path="/admin/Add_user" component={AddUser}></Route>
          <Route path="/admin/Electiveinfo" component={ElectiveInfo}></Route>
          <Route path="/admin/ElectiveScore" component={Electivescore}></Route>
          <Route path="/Faculty/FacultyDashboard" component={FacultyDashboard}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
