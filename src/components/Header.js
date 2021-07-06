import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "../App.css"
export default class Header extends Component {
    render() {
        return (
     <div className="Navbar"> 
      <div className="leftSide"> 
      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/Registration">Register</Link>
      <Link className="link" to="/login">Login</Link>
      <Link className="link" to="/Feedback2">Feedback</Link>
      </div>
      <div className="rightSide"> 
          <div><input placeholder="Search...."></input><button className="button">Search</button></div>
      </div>
      
    </div>
        )
    }
}
