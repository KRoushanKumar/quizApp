import React, { useState } from 'react'
import Axios from 'axios';
//import Admin from  "./Admin"
import { useHistory } from "react-router-dom";
import '../assets/css/Login.css'
import TakeTest from './Student/TakeTest.js'
import pic from '../assets/img/logo.png';
import Registration from './Registration';

function Login() {

  //const [UserName, setUserName] = useState("")
  const [EmailId, setEmailId] = useState("")
  const [Password, setPassword] = useState("")
  const [openPopup, setOpenPopup] = useState(false);
  const [openTest,setOpenTest]=useState(false);
 
  const history = useHistory();
  Axios.defaults.withCredentials = true;


  // const adminReg = () => {
  //     Axios.post('https://quiz--2021.herokuapp.com/api/registration', { UserName: UserName, EmailId: EmailId,Password: Password }).then(() => {
  //       alert("Sucessfull insert");
  //     })
  // };

  const btnLogin = () => {
    Axios.post('https://quiz--2021.herokuapp.com/api/Login', { EmailId: EmailId, Password: Password }).then((response) => {

      if (response.data.loggedIn === true) {
        alert(response.data.user)
        sessionStorage.setItem('UserID', response.data.user)
        sessionStorage.setItem('userType',response.data.userType)
        alert( "userType = " +sessionStorage.getItem('userType'));
        let path = `Admin`;
        let pathStudent = 'Student'
        if(sessionStorage.getItem('userType')==1)
        history.push(path);
        else if(sessionStorage.getItem('userType')==3)
        {
          history.push(pathStudent);
        }else
        {

        }
      } else {
        alert("No");
      }
    });
  };

  return (
    <div className="CenterFrom">
    <div className="LoginApp">
      <div className="Loginform">
        <img className="LoginLogo" src={pic} alt="Logo" />
        <label> Welcome to MANIT BHOPAL </label>
        <br></br>
       <div>
        <i class="fa fa-user"></i>
       <input type="text" name="EmailId" placeholder="User Email ID" onChange={(e) => { setEmailId(e.target.value) }}></input>
       </div>
        
        <div>
          <i class="fa fa-key"></i>
        <input type="password" name="Password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}></input>
        </div>
        
        <button onClick={btnLogin}>Login</button>
        {/* <button onClick={adminReg}>adminReg</button> */}
        <button className="registration" onClick={() => setOpenPopup(true)}>SIGN UP/NEW REGISTRATION</button><br/>
          
          <Registration openPopup={openPopup}
            setOpenPopup={setOpenPopup}>

          </Registration>
          <TakeTest open={openTest}
          setOpen={setOpenTest}></TakeTest>
      </div>
    </div>
    </div>
  )
}
export default Login
