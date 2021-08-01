import React, { useEffect, useState } from 'react'
import {LeftSection} from '../Design/styledComponent'
import axios from 'axios'
import Navbar from '../Navigations/Navbar';
import '../Design/styles.css';

import {useSelector, useDispatch} from 'react-redux';
import { userActions } from '../../Store/Redux.js';


const Home = (props) =>{

    const userState = useSelector(state => state.user);
    //const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
      const handleUpdate = (response) =>{
        if(response.data.userType === 'admin'){
            dispatch(userActions.adminApproved());
        }
        if(response.data.jobTitle === 'Manager' || response.data.jobTitle === 'manager'){
            dispatch(userActions.managerApproved());
        }
        if(response.data.companyName != undefined){
            dispatch(userActions.updateCompany({companyName : response.data.companyName}));
        }
        dispatch(userActions.updateProfile({firstName : response.data.firstName,lastName : response.data.lastName}));
    }
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            axios.get("http://localhost:4000/app/auth/validate").then(response => console.log(response));
            document.body.style.backgroundColor = "white";
            props.history.push("/unauthorized");
            
        }
        axios.post("http://localhost:4000/app/account/profile", {},{headers: {Authorization : localStorage.getItem('token')}}).then(response => handleUpdate(response));
    } ,[localStorage.getItem('token')]);
    return (
        <>
            <Navbar/>     
            <LeftSection/>
        </>
    )
}

export default Home
