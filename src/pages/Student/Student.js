import React, {useState,useEffect}from 'react'
import './Student.css'
import img1 from './images/blank_image.jpg'
import Axios from 'axios';
import TakeTest from './TakeTest';
import { useHistory } from "react-router-dom";
const Student = () => {
  const [scheduledTest,setScheduledTest] = useState([]);
  const [openTest,setOpenTest]=useState(false);
  const [StudentDetail, setStudentDetail] = useState([])  
  const history = useHistory();

  const StartTest=(Q_ID)=>{
    sessionStorage.setItem('Q__ID',Q_ID)
    alert('Question Type'+ sessionStorage.getItem('Q__ID'))
    setOpenTest(true)
    console.log(scheduledTest)
}
useEffect(()=>{
  Axios.get('https://quiz--2021.herokuapp.com/api/test')
  .then((response)=>{
    setScheduledTest(response.data);
  })
},[])
useEffect(() => {
  Axios.post('https://quiz--2021.herokuapp.com/api/getAdminDetails',{userID:sessionStorage.getItem('UserID')}).then((response) => {
      console.log(response);
      setStudentDetail(response.data)
  })
  
},[]);

function resultpage()
{
  history.push('/StudentResult');
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
  <>
    <div className="heading">
      <h1><span>Student Portal</span></h1>
    </div>
    <div className='part'>
      <div className='part1'>
        <navbar>
          <h2>Information</h2>
        </navbar>
        <div className='info'>
          <div className='pic'>
            <img src={img1} alt="" />
          </div>
         <div className='mid'>
            <ul>
              {
                StudentDetail.map((val)=>{
                  return (
                    <>
                    <li><h2>Name : {val.FName}</h2></li>
                    <li><h2>Email : {val.EmailID}</h2></li>
                    <li><h2>Father's name : {val.FatherNm}</h2></li>
                    {/* <li><h2>Userid : 001</h2></li> */}
                    </>
                  )
                })
              }
              
            </ul>
          </div>
          <div className='lower'>
            <div className="ui inverted segment">
           
            <button className="ui inverted primary button" onClick={resultpage}>Results</button>
            <button className="ui inverted secondary button" onClick={logout}>LOGOUT</button></div>
          </div>
          </div>
        </div>
        <div className='part2'>
         <div className='part2head'>
           <h2>All Quiz</h2>
         </div>
         {scheduledTest.map((obj)=>(
         <div class="card">
            <h5 class="card-header center">{obj.QuizName}</h5>
            <div class="card-body">
            <h5 class="card-title">Starts on: #hh:mm:ss AM</h5>
            <p class="card-text">Time:- {obj.Duration} minutes</p>
            <p class="card-text">Question Type:- Objective</p>
            <p class="card-text">No. of Questions:-{obj.NoOfQues}</p><hr/>
            <a href="#" onClick={()=>{StartTest(obj.Q_ID)}} class="btn btn-primary">Start Test</a>
          </div>
          
        </div>
          ))}
        </div>
        
      </div>
      <TakeTest open={openTest}
        setOpen={setOpenTest}
        name="">
      </TakeTest>
    </>
  )
}
export default Student;