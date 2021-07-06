import React , {useState,useEffect} from 'react'
import '../assets/css/AdminStyle.css'
import Axios from 'axios';
//import {BrowserRouter as Router ,Switch,Route,Link,Redirect} from "react-router-dom"
import SetQuestion from './SetQuestion'
import { useHistory } from "react-router-dom";




function Admin() {

    const [adminDetail, setadminDetail] = useState([])   
    const history = useHistory();
    
    

    useEffect(() => {
        Axios.post('https://quiz--2021.herokuapp.com/api/getAdminDetails',{userID:sessionStorage.getItem('UserID')}).then((response) => {
            console.log(response);
            setadminDetail(response.data)
        })
        
    },[]);
    function showSetQuestion ()
    {
        document.getElementById('setQuestionDiv').style.display='block'
        document.getElementById('resultDiv').style.display='none'
        document.getElementById('SetQueBtn').classList.add('active')
        document.getElementById('resultbtn').classList.remove('active')
    }
    
    function showresultDiv ()
    {
        document.getElementById('resultDiv').style.display='block'
        document.getElementById('setQuestionDiv').style.display='none'
        document.getElementById('resultbtn').classList.add('active')
        document.getElementById('SetQueBtn').classList.remove('active')
    }
    if(!sessionStorage.getItem('UserID'))
    {
        history.push('/')
    }
    
    function logout()
    {
        sessionStorage.clear()
        history.push('/')
    }
    
    return (
        <div>  
            
        <div className="sideBar" >
            <div style={{marginLeft:'5px'}}>
            <p>{adminDetail.map((val)=>{
                return <>
                Name : {val.FName}
                <br></br>
                Email : {val.EmailID}
                </>
            })}</p>
            <div>
            <button className="btn btn-primary w-100" id="SetQueBtn"  onClick={showSetQuestion} >
                Set Question
            </button>
            </div>
            <div>
            <button className="btn btn-primary w-100" id="resultbtn"  onClick={showresultDiv}  >
                Result
            </button>
            </div>
            <div>
            <button className="btn btn-primary w-100" >
                Add Student
            </button>
            </div>
            
            
            
            </div>
           
           

        </div>
        

        <div className="topBar"> 
        
            <div className="rightSideAdmin">
                <div>
                <button onClick={logout} className="btn">Log Out</button>
                </div>
                
            </div>
        </div>


        <div className="MainDiv" id="addstudendDiv" style={{display:'none'}}> 
            mainDiv
            this is mainDiv.
            <div>
               <h1>Hello</h1> 
               Add studen 
            </div>
            
        </div>
        <div className="MainDiv" id="setQuestionDiv" style={{display:'none'}}> 
             <SetQuestion/> 
        </div>
        <div className="MainDiv" id="resultDiv" style={{display:'none'}}> 
            mainDiv
            this is mainDiv.
            <div>
               <h1>Hello</h1> 
               result
            </div>
        </div>
        
               
        </div>
    )
}

export default Admin
