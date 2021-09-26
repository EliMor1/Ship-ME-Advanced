import React, { useEffect,useState } from 'react'
import {Form,ColumnLeft,ColumnRight,Row,FullInput,FormLabel,BlankImg,Save} from '../Design/styledComponent'
import axios from 'axios'
import defaultImg from '../../assets/Default.jpg'
import '../Design/styles.css';
import { useDispatch} from 'react-redux';
import { userActions } from '../../Store/Redux.js';


const Profile = (props) =>{
    const dispatch = useDispatch();

    const [userInput,setUserInput] = useState({
        firstName:'',
        lastName:'',
        jobTitle:'',
        primaryPhone:'',
        secondaryPhone:'',
        primaryEmail : '',
        secondaryEmail:'',
        companyName:'',
        userType:false
      })
    
    const handleChange = (event) =>{
        const input = event.target;
        const value = input.value;
        setUserInput({ 
            ...userInput,
            [input.name] : value,
        })
    }

    const handleUpdate = (response) =>{
        var userRole = false;
        if(response.data.userType === 'admin'){
            userRole = true;
        }
        setUserInput({
            ...userInput,
            firstName:response.data.firstName,
            lastName:response.data.lastName,
            jobTitle:response.data.jobTitle,
            primaryPhone:response.data.primaryPhone,
            secondaryPhone:response.data.secondaryPhone,
            primaryEmail:response.data.primaryEmail,
            secondaryEmail:response.data.secondaryEmail,
            companyName:response.data.companyName,
            userType:userRole       
        });
    }
    


    useEffect(() =>{
        if(!localStorage.getItem('token')){
            axios.get("http://localhost:4000/app/auth/validate").then(response => console.log(response));
            document.body.style.backgroundColor = "white";
            props.history.push("/unauthorized");
            
        }
        axios.get("http://localhost:4000/app/account/profile", {headers: {Authorization : localStorage.getItem('token')}}).then(response => handleUpdate(response));
    }, [localStorage.getItem('token')])

      

    const handleSubmit = (event) =>{
        event.preventDefault();
        const profileSettings ={
            firstName:userInput.firstName,
            lastName:userInput.lastName,
            jobTitle:userInput.jobTitle,
            primaryPhone:userInput.primaryPhone,
            secondaryPhone:userInput.secondaryPhone,
            secondaryEmail:userInput.secondaryEmail,
        }
        axios.patch("http://localhost:4000/app/account/profile/update", profileSettings,{headers: {Authorization : localStorage.getItem('token')}} )
        .then(response => console.log(response));  
        if(userInput.companyName != undefined){
            dispatch(userActions.updateCompany({companyName : userInput.companyName}));
        }
        dispatch(userActions.updateProfile({firstName : userInput.firstName,lastName : userInput.lastName}));
        alert('profile updated successfully!');
          
    } 

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <h2>Profile</h2>
                <Row>
                    <ColumnLeft>
                    <BlankImg src = {defaultImg}></BlankImg>
                    </ColumnLeft>
                    <ColumnRight>
                        <FormLabel>First name</FormLabel>
                        <FullInput type="text" name="firstName" value={userInput.firstName}  onChange={handleChange}></FullInput>
                        <FormLabel>Last name</FormLabel>
                        <FullInput type="text" name="lastName" value={userInput.lastName}  onChange={handleChange}></FullInput>
                    </ColumnRight>
                </Row>
                <FormLabel>Job title</FormLabel>
                <FullInput type="text" name="jobTitle" value={userInput.jobTitle}  onChange={handleChange}></FullInput>
                <hr></hr>
                <FormLabel>Primary phone number</FormLabel>
                <FullInput type="text" name="primaryPhone" value={userInput.primaryPhone}  onChange={handleChange}></FullInput>
                <FormLabel>Secondary phone number</FormLabel>
                <FullInput type="text" name="secondaryPhone" value={userInput.secondaryPhone}  onChange={handleChange}></FullInput>
                <FormLabel>Primary email</FormLabel>
                <h5>{userInput.primaryEmail}</h5>
                <FormLabel>Secondary email</FormLabel>
                <FullInput type="email" name="secondaryEmail" value={userInput.secondaryEmail}  onChange={handleChange}></FullInput>
                <hr></hr>
                <FormLabel>Old password</FormLabel>
                <FullInput type="password"></FullInput>
                <FormLabel>New password</FormLabel>
                <FullInput type="password"></FullInput>
                <FormLabel>Confirm password</FormLabel>
                <FullInput type="password"></FullInput>
                <hr></hr>
                <br></br>
                <Save type="submit" value="Save"></Save>
            </Form>
        </>
    );
}

export default Profile
