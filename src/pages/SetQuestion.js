import React, { useEffect, useState } from 'react'
import '../assets/css/AdminStyle.css'
import Axios from 'axios'
function SetQuestion() {

    const [quizlist, setquizlist] = useState([])
    var noCount = 0;
    const [marks, setmarks] = useState(0)
    const [firstdropdown, setFirstdropdown] = useState([]);
    const [quizType, setquizType] = useState(0)
    const [quizName, setquizName] = useState("");
    const [Duration, setDuration] = useState(0);
    const [NoOfQues, setNoOfQues] = useState(0);
    const [ques, setques] = useState([]);
    const [NoOfquestion, setNoOfquestion] = useState(0);

    useEffect(() => {
        Axios.get('https://quiz--2021.herokuapp.com/api/getQuiz').then((response) => {
            console.log(response);
            setquizlist(response.data)

        })
    }, []);
    useEffect(() => {
        Axios.get('https://quiz--2021.herokuapp.com/api/getQuizType').then((response) => {
            console.log(response);
            setFirstdropdown(response.data)

        });
    }, []);

    function clearSetQuestion() {
        document.getElementById('txtqname').value = "";
        document.getElementById('txtdur').value = "";
        document.getElementById('txtnoofque').value = "";
        document.getElementById('txtmks').value = "";
    }
    

    function setQestion() {
        Axios.post('https://quiz--2021.herokuapp.com/api/setquiz', { quizType: quizType, quizName: quizName, Duration: Duration, NoOfQues: NoOfQues, marks: marks }).then((response) => {
            //alert(response.data.insert);
            if (response.data.insert) {
                alert("New Quiz Added");
                clearSetQuestion();
                Axios.get('https://quiz--2021.herokuapp.com/api/getQuiz').then((response) => {
                    console.log(response);
                    setquizlist(response.data)
                })
                // reset table
            }
        });
    }

    function DeleteQuiz(Q_ID) {
        Axios.delete(`https://quiz--2021.herokuapp.com/api/deleteQuiz/${Q_ID}`).then((res) => {
            if (res.data.delete)
                alert("Quiz Deleted")
        });
        Axios.get('https://quiz--2021.herokuapp.com/api/getQuiz').then((response) => {
            console.log(response);
            setquizlist(response.data)

        })
    }
    var current = 0;
    
    function addQuizQuestion(Q_ID, NoOfQues) {
        document.getElementById('btnSave').disabled=true;
        setNoOfquestion(NoOfQues)
        //var Q = Q_ID;
        alert(Q_ID)
        sessionStorage.setItem('Q_ID', Q_ID)
        sessionStorage.setItem('NoOfQues', NoOfQues)
        document.getElementById('SetQuestionDiv').style.display = 'block'
        document.getElementById('quizDiv').style.display = 'none'
        fetchQuestion()
        var s = "";
        var i = 0;
        for (i = 1; i <= NoOfQues; i++) {
            s += "<div class='row Tab'>";
            s += "<div class='input-group mb-3 '>";
            s += "<span class='input-group-text' id='basic-addon1'>" + i + ".</span>";
            s += "<input  type='text' class='form-control' id='Que" + i + "' placeholder='Write here your Question ' value=''  />";
            s += "</div>";
            s += "<div class='input-group  mb-3'>";
            s += "<span class='input-group-text' id='basic-addon1'>a)</span>";
            s += "<input type='text' class='form-control' id='Que" + i + "opt1' placeholder='option 1  ' value=''/>";

            s += "<span class='input-group-text' id='basic-addon1'>b)</span>";
            s += "<input type='text' class='form-control' id='Que" + i + "opt2' placeholder='option 2' value=''/>";
            s += "</div>";

            s += "<div class='input-group mb-3'>";
            s += "<span class='input-group-text' id='basic-addon1'>c)</span>";
            s += "<input type='text' class='form-control' id='Que" + i + "opt3' placeholder='option 3' value=''/>";
            s += "<span class='input-group-text' id='basic-addon1'>d)</span>";
            s += "<input type='text' class='form-control' id='Que" + i + "opt4' placeholder='option 4 ' value=''/>";
            s += "</div>";

            s += "<div>";
            s += "<select id='Que" + i + "ans' class='form-select' aria-label='Default select example'>";
            s += "<option >select option</option>";
            s += "<option value='a'>a</option>";
            s += "<option value='b'>b</option>";
            s += "<option value='c'>c</option>";
            s += "<option value='d'>d</option>";
            s += "</select>";
            s += "</div>";
            s += "</div>";
        }
        document.getElementById('QuestionDiv').innerHTML = s;
        document.getElementsByClassName('Tab')[0].style.display = 'block'
        
    }
    function fetchQuestion()
    {
        sessionStorage.getItem('Q_ID')
        Axios.post('https://quiz--2021.herokuapp.com/api/FetchQuestion', {Q_ID__ : sessionStorage.getItem('Q_ID') }).then((response) => { 
            if (response.data) {
                alert("___data fetched..");
                
                setques(response.data)
           }
        });
        
        // var question = document.getElementById(qid).value;
        // var o1 = document.getElementById(opt1).value;
        // var o2 = document.getElementById(opt2).value;
        // var o3 = document.getElementById(opt3).value;
        // var o4 = document.getElementById(opt4).value;
        // var ansopt = document.getElementById(ans).value;
    }
    //alert(JSON.stringify(ques))
    function f(){
        setNoOfquestion(sessionStorage.getItem('NoOfQues')-ques.length)
    var i=0;
    for(i=1;i<=ques.length;i++)
    {
        var qid='Que'+i;
        var opt1='Que'+i+'opt1';
        var opt2='Que'+i+'opt2';
        var opt3='Que'+i+'opt3';
        var opt4='Que'+i+'opt4';
        var ans='Que'+i+'ans';
        // alert(qid )
        // alert(opt1 )
        // alert(opt2 )
        // alert(opt3 )
        // alert(opt4 )
        document.getElementById(qid).value=ques[i-1].Question;
        document.getElementById(opt1).value=ques[i-1].O1;
        document.getElementById(opt2).value=ques[i-1].O2;
        document.getElementById(opt3).value=ques[i-1].O3;
        document.getElementById(opt4).value=ques[i-1].O4;
        document.getElementById(ans).value=ques[i-1].Ans

        document.getElementById(qid).disabled = false;
        document.getElementById(opt1).disabled = false;
        document.getElementById(opt2).disabled = false;
        document.getElementById(opt3).disabled = false;
        document.getElementById(opt4).disabled = false;
        document.getElementById(ans).disabled = false;

    }
    document.getElementById('btnSave').disabled=false;
    }


    function setQue() {
        document.getElementById('SetQuestionDiv').style.display = 'none'
        document.getElementById('quizDiv').style.display = 'block'
    }
    function setQueInDatabase(que, opt1, opt2, opt3, opt4, ans) {

        Axios.post('https://quiz--2021.herokuapp.com/api/setQueInDatabase', {
            que: que,
            opt1: opt1,
            opt2: opt2,
            opt3: opt3,
            opt4: opt4,
            ans: ans,
            q_id: sessionStorage.getItem('Q_ID')
        }).then((response) => {

            if (response.data.insert === true) {
                alert(response.data.insert)
                setNoOfquestion(NoOfquestion-1)
            } else {
                alert("No");
            }
        });

    }
    function nextPrevsave() {
        alert("Question Is")
        var qid;
        var c
        c = current + 1;
        qid = 'Que' + c;
        var opt1 = qid + 'opt1';
        var opt2 = qid + 'opt2';
        var opt3 = qid + 'opt3';
        var opt4 = qid + 'opt4';
        var ans = qid + 'ans';
        document.getElementById(qid).disabled = true;
        document.getElementById(opt1).disabled = true;
        document.getElementById(opt2).disabled = true;
        document.getElementById(opt3).disabled = true;
        document.getElementById(opt4).disabled = true;
        document.getElementById(ans).disabled = true;

        var question = document.getElementById(qid).value;
        var o1 = document.getElementById(opt1).value;
        var o2 = document.getElementById(opt2).value;
        var o3 = document.getElementById(opt3).value;
        var o4 = document.getElementById(opt4).value;
        var ansopt = document.getElementById(ans).value;
        if(NoOfquestion>0){
        setQueInDatabase(question, o1, o2, o3, o4, ansopt);
        }
        else{
           alert("Question Is Full.")
        }

 
    }
    function nextPrevP(n) {
        document.getElementById('btnSave').disabled=true;
        if(current>0){
 
            document.getElementsByClassName('Tab')[current].style.display = 'none';
        
        current += n;

            document.getElementsByClassName('Tab')[current].style.display = 'block';
        
        }
        
    }
    function nextPrevv(n) {
        if(current<sessionStorage.getItem('NoOfQues')-1){
 
            document.getElementsByClassName('Tab')[current].style.display = 'none';
        
        current += n;

            document.getElementsByClassName('Tab')[current].style.display = 'block';
        
        }
        
    }
    return (
        <div >
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                <div>
                    <label>
                        Quiz Type
                        <select
                            id="first"
                            onChange={(e) => {
                                setquizType(e.target.value);
                            }}
                        >
                            <option key="0" value="0">--Select--</option>
                            {
                                firstdropdown.map((val) => {
                                    return (
                                        <option key={val.QT_ID} value={val.QT_ID}>{val.QuizeType}</option>
                                    );

                                })
                            }
                        </select>
                    </label>
                    <br></br>
                    <label>Quiz Name</label>
                    <input onChange={(e) => { setquizName(e.target.value) }} id="txtqname" className="form-control form-control-lg w-50" type="text" aria-label=".form-control-lg example" />
                    <label>Duration</label>
                    <input onChange={(e) => { setDuration(e.target.value) }} id="txtdur" className="form-control form-control-lg w-50" type="text" aria-label=".form-control-lg example" />
                    <label>No of Question</label>
                    <input onChange={(e) => { setNoOfQues(e.target.value) }} id="txtnoofque" className="form-control form-control-lg w-50" type="text" aria-label=".form-control-lg example" />
                    <label>Marks Each Question</label>
                    <input onChange={(e) => { setmarks(e.target.value) }} id="txtmks" className="form-control form-control-lg w-50" type="text" aria-label=".form-control-lg example" />
                    <br></br>
                    <button onClick={setQestion}>Submit</button>
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <div id="quizDiv" style={{ display: 'block' }}>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th style={{ width: '20px' }}>Delete</th>
                                <th style={{ width: '20px' }}>Add</th>
                                <th>Quiz Type</th>
                                <th>Quiz name</th>
                                <th>Duration</th>

                                <th>No of question</th>
                                <th>Marks </th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizlist.map((val) => {
                                return (
                                    <tr>
                                        <td >{++noCount}</td>
                                        <td onClick={() => { DeleteQuiz(val.Q_ID) }} ><i className="fa fa-trash"></i></td>
                                        <td onClick={() => { addQuizQuestion(val.Q_ID, val.NoOfQues) }} ><i className="fa fa-pencil"></i></td>
                                        <td>{val.quizetype}</td>
                                        <td>{val.QuizName}</td>
                                        <td>{val.Duration}</td>
                                        <td>{val.NoOfQues}</td>
                                        <td>{val.marks}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </div>

                <div id="SetQuestionDiv" style={{ display: 'none' }}>
                    <div>
                        <label className="form-label labelAddQue"> Add Question </label>
                        <label className="form-label labelremQue"> Remaning Quiestion {NoOfquestion}  </label>
                    </div>
                    <div id="QuestionDiv" >

                    </div>

                    <hr></hr>
                    <div>
                        <button id="btnPrev" onClick={() => { nextPrevP(-1) }} >Previous</button>
                        <button id="btnSave" onClick={() => { nextPrevsave() }} >Save </button>
                        <button id="btnNext" onClick={() => { nextPrevv(1) }} >Next </button>
                        <button id="btnEdit" onClick={f}>Show </button>
                        <button id="btnUpdate" style={{display:'none'}} >Update </button>
                        <button  >Delete </button>
                    </div>

                    <hr></hr>
                    <button onClick={setQue}>Back</button>

                </div>

            </div>
        </div>
    )
}

export default SetQuestion
