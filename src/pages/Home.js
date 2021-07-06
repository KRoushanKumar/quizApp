import React, { Component } from 'react'
import Header from  '../components/Header'
import Footer from  '../components/Footer'
import quizhome from '../assets/img/quizhome1.jpg'
export default class Home extends Component {
    
    render() {
        return (
            <div>
                <Header/>
                <img src={quizhome} alt="imgae" ></img>
                <Footer/>
            </div>
        )
    }
}


