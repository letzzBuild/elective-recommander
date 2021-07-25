import React from 'react';
import Login from "./Pages/Login"
import DashBoard from "./Pages/Student/DashBoard";
import Helpme from "./Pages/Student/Helpme"
import ChooseElective from "./Pages/Student/ChooseElective"
import rating from "./Pages/Student/Faculty_Rating"
import './App.css';
import {BrowserRouter as Router, Link, Switch, Route, withRouter } from "react-router-dom";
import FacultyRating from './Pages/Student/Faculty_Rating';
import FacultyDashboard from './Pages/Faculty/FacultyDashboard';
import { ToastContainer } from 'react-toastify';
import Recommander from './Pages/Student/Recommander';

function App() {
  return (
    <div className="App">
      {/* <Login /> */}

      {/* <Signup /> */}
      {/* <DashBoard /> */}
      <Router>
        <Switch>
          <Route exact path="/Login" component={Login}></Route>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/dashboard" component={DashBoard}></Route>
          <Route exact path="/Helpme" component={Helpme}></Route>
          <Route exact path="/ChooseElective" component={ChooseElective}></Route>
          <Route exact path="/rating" component={FacultyRating}></Route>
          <Route exact path="/recommand" component={Recommander}></Route>
          <Route exact path="/Faculty/FacultyDashboard" component={FacultyDashboard}></Route>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
