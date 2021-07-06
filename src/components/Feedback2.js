import "../assets/css/feedback.css"
import React, { useState, useEffect } from "react";
import '../App.css';
import Axios from 'axios';


function Feedback2() {
    
    const [FeedbackList,setFeedbackList] = useState([]);

    useEffect(() => {
        Axios.get('https://quiz--2021.herokuapp.com/api/getFeedback').then((response) => {
           //console.log(response);
           setFeedbackList(response.data)
        })
      },[]);

    function Clear() {
        document.getElementById("fname").value = "";
        document.getElementById("mname").value = "";
        document.getElementById("lname").value = "";
       // document.querySelector('input[name="gender"]:checked').checked = false;
        document.getElementById("sugges").value = "";
        
    }

  
    function input() {

        var fname = document.getElementById("fname").value;
        var midmame = document.getElementById("mname").value;
        var lastname = document.getElementById("lname").value;
        var title = document.querySelector('input[name="gender"]:checked').value;
        var name;
        var sex ;
        if(title === "Mr")
        sex="Male";
        else
        sex = "Female";
        var suggestion = document.getElementById("sugges").value;
        if (fname === "" ) {
            alert("Please inpur your first name. ");
        }
        else if (lastname === "")
        {
            alert("Please inpur your last name. ");
        }
        else if (suggestion === "") {
            alert("Please inpur your suggestion. ");
        }
        else if (fname.length > 40 || midmame.length > 40 || lastname.length > 40)
        {
            alert("Please inpur your name in 40 char ");
        }
        else{
            if (midmame.trim() === "")
               name = title + " " + fname.trim() + " " + lastname.trim();
            else {
                name = title + " " + fname.trim() + " " + midmame.trim() + " " + lastname.trim()
            }
        } 
        Axios.post('https://quiz--2021.herokuapp.com/api/insertFeedback', { Name:name,sex:sex,suggestion:suggestion }).then(() => {
          alert("Sucessfull insert Feedback");
        })
        Axios.get('https://quiz--2021.herokuapp.com/api/getFeedback').then((response) => {
           //console.log(response);
           setFeedbackList(response.data)
        })

        Clear();
        
    }
    function validName() {
        //document.getElementsByClassName("s").style.display = "none";
        var a = document.getElementById("fname").value;
        if(a.length>0)
            document.getElementById("s").style.display = "none";
        else
            document.getElementById("s").style.display = "inline-block";
    }

    return (

        
            <div className="MainFeedback">
                <div className="leftside"> 
                    <div className="Feedback">
                        <div className="inputBox MyLabel" >
                            <div ><label for="fname">First name</label><label id="s" className="s">*</label></div>
                            <div > <input type="text" id="fname" name="fname" onKeyPress={()=>{validName()}} onKeyUp={()=>{validName()}} required /></div>

                        </div>
                        <div className="inputBox MyLabel">
                            <div ><label for="mname">Middle name</label></div>
                            <div > <input type="text" id="mname" name="mname" /></div>
                        </div>
                        <div className="inputBox MyLabel" >
                            <div ><label for="lname">last name</label></div>
                            <div > <input type="text" id="lname" name="lname" required /></div>
                        </div>
                        <div className="inputBox MyLabel" >
                            <div style={{ width: '200px' }}><label for="sugg">Suggestion</label></div>
                            <div > <textarea id="sugges" name="sugg" className="mysugg" required></textarea></div>
                        </div>
                        <div className="MyLabel">
                            <div style={{ width: '200px' }}><label for="fname">Gender</label></div>
                            <div style={{ width: '200px' }}>
                                <input type="radio" id="male" name="gender" value="Mr" required />
                                <label for="male" >Male</label>
                                <input type="radio" id="female" name="gender" value="Ms" required />
                                <label for="female" >Female</label>
                            </div>
                        </div>
                        <div >

                            <input type="submit" value="Submit" className="Button" onClick={()=>{input()}} />
                            <input type="submit" value="Clear" className="Button" onClick={()=>{Clear()}} />
                        </div>
                    </div>
                    

                </div>
                <div className="rightside">
                    <div className="Topfeedback" id="TopFeedback1">

                        <div id="TopFeedback1">
                           {
                               FeedbackList.map((value)=>{
                                return (
                                    <div  class='feed'>
                                         Name:  {value.Name} <br></br>  Suggestion:  {value.suggestion}  <br></br>
                                    </div>
                                )
                               })
                           } 
                        </div>


                    </div>

                </div>
            </div>
        
    )
}

export default Feedback2
