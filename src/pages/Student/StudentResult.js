import { useState , useEffect} from "react";
import React from 'react'
import Axios from 'axios'

function StudentResult() {
    const [getResult, setgetResult] = useState([])
    const [getFullResult, setgetFullResult] = useState([])
    var noCount = 0;
    useEffect(() => {
        Axios.post('https://quiz--2021.herokuapp.com/api/S_result',{userID:sessionStorage.getItem('UserID')}).then((response) => {
            console.log(response);
            setgetResult(response.data)

        })
    }, []);

    function viewFullResult(QR_ID)
    {
        Axios.post('https://quiz--2021.herokuapp.com/api/S_Fullresult',{QR_ID:QR_ID}).then((response) => {
            console.log(response);
            setgetFullResult(response.data)

        })
    }

    return (
        <div>
            <div id="quizDiv" style={{ display: 'block' }}>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th style={{ width: '20px' }}>view</th>
                            <th>QR_ID</th>
                            <th>Date</th>
                            <th>Quiz Name</th>
                            <th>Result</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {getResult.map((val) => {
                            return (
                                <tr>
                                    <td >{++noCount}</td>
                                    <td onClick={()=>{viewFullResult(val.QR_ID)}}><i className="fa fa-pencil"></i></td>
                                    <td>{val.QR_ID}</td>
                                    <td>{val.quiztakedate}</td>
                                    <td>{val.QuizName}</td>
                                    <td>{val.Result}</td>
                                   
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>

            <div id="FullResult" style={{ display: 'block' }}>
                <button>Close</button>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>QR_ID</th>
                            <th>Q_Id</th>
                            <th>Qu_ID</th>
                            <th>question</th>
                            <th>Option 1</th>
                            <th>Option 2</th>
                            <th>Option 3</th>
                            <th>Option 4</th>
                            <th>Your Ans</th>
                            <th>Correct Ans</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {getFullResult.map((val) => {
                            return (
                                <tr>
                                    <td >{++noCount}</td>
                                    <td>{val.QR_ID}</td>
                                    <td>{val.Q_Id}</td>
                                    <td>{val.Qu_ID}</td>
                                    <td>{val.question}</td>
                                    <th>{val.o1}</th>
                                    <th>{val.o2}</th>
                                    <th>{val.o3}</th>
                                    <th>{val.o4}</th>
                                    <th>{val.s_ans}</th>
                                    <th>{val.Ans}</th>
                                   
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default StudentResult
