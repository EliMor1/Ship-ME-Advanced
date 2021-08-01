import React, { useEffect } from 'react'
import {LeftSection} from '../Design/styledComponent'
import axios from 'axios'
import Navbar from '../Navigations/Navbar';
import '../Design/styles.css';


const Home = (props) =>{
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            axios.get("http://localhost:4000/app/auth/validate").then(response => console.log(response));
            document.body.style.backgroundColor = "white";
            props.history.push("/unauthorized");
            
        }
    } ,[localStorage.getItem('token')]);
    return (
        <>
            <Navbar/>     
            <LeftSection/>
        </>
    )
}

export default Home
