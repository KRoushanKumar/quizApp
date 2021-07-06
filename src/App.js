import React from "react";
import './App.css';
import {BrowserRouter as Router ,Switch,Route} from "react-router-dom"
import Home from "./pages/Home"
import login from "./pages/Login"
import Registration from "./pages/Registration"
import Admin from "./pages/Admin"
import Feedback2 from "./components/Feedback2"
import Student from "./pages/Student/Student"
//import SetQuestion from './pages/SetQuestion'
import StudentResult from './pages/Student/StudentResult'
import Axios from 'axios';
function App() {
  
 // render() {
    Axios.defaults.withCredentials=true;
    return (
      <>
      <Router>
    
        <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" exact component={login}></Route>
        <Route path="/Admin" exact component={Admin}></Route>
        <Route path="/Registration" exact  component={Registration}></Route>
        <Route path="/Feedback2" exact  component={Feedback2}></Route>
        <Route path="/Student" exact  component={Student}></Route>
        <Route path="/StudentResult" exact  component={StudentResult}></Route>

        </Switch>

      </Router>
      </>
    );
 // };
}

export default App;
