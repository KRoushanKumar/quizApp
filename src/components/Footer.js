import React, { Component } from 'react'
import '../assets/css/Footer.css'
export default class Footer extends Component {
    render() {
        return (
        //     <div className="Footer">
        //     <div className="FooterLeftSide">
        //         <p>copyright @2021 Roushan Kumar</p>
        //     </div>
        //     <div className="FooterRighttSide"><p>Patna ,Bihar</p></div>
        // </div>
        <>
        <div className="mnfoot">
          <div className="col1">
            <ul>
            <li>Institue : MANITB</li>
            <li><p>Guidence :- Prof. Aniban Chowdhury</p></li>
            <li><span className="creat">Created By : Rouashan ,Manish ,Vishal</span></li>
           </ul>
          </div>
          <div className="col2">
            <ul>
            <li>Technology :- HTML,CSS,REACT,SQL</li>
            <li><p>Guidence :- Prof. Aniban Chowdhury</p></li>
            <li><span className="creat">Created By : Rouashan ,Manish ,Vishal</span></li>
           </ul>
          </div>
          <div className="col3">
            <ul>
            <li><p> &#169;CopyRight  2021- All Right Reserved.   </p></li>
            <li>Sem :- Second</li>
           </ul>
          </div>
        </div>
        </>

        )
    }
}
