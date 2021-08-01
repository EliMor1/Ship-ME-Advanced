import React, { useState, useEffect } from 'react'
import {AddNewUser} from '../Design/styledComponent'
import axios from 'axios'
import {Link} from 'react-router-dom';
import Navbar from '../Navigations/Navbar';
import InternNavbar from '../Navigations/InternNavbar';
import blankImage from '../../assets/BlankImage.png'
import '../Design/styles.css';



const Account = (props) =>{
    const [userInput,setUserInput] = useState({
        allCompanyUsers:[],
        allExistingUsers:[],
        isAdmin:true,
      })

      useEffect(() => {
        if(!localStorage.getItem('token')){
            axios.get("http://localhost:4000/app/auth/validate").then(response => console.log(response));
            document.body.style.backgroundColor = "white";
            props.history.push("/unauthorized");
            
        }
      }, [localStorage.getItem('token')])

    return (
        <>
            <Navbar/>
            <InternNavbar/>  
            <input type="text" id="myInput" placeholder="Search" title="Type in a name"></input>
            <Link to ="/account/new-user"><AddNewUser type="button" value="Add user"></AddNewUser></Link>
        </>
    )
}

export default Account
