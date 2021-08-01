import React, { useState,useEffect } from 'react'
import {Header,Form,ColumnLeft,ColumnRight,Row,FullInput,FormLabel,BlankImg,Save,LeftColumn,CenterColumn,RightColumn,Cancel,Create} from '../Design/styledComponent'
import axios from 'axios'
import Default from '../../assets/Default.jpg'
import '../Design/styles.css';

const NewUser = (props) =>{

    const [userInput,setUserInput] = useState({
        firstName:'',
        lastName:'',
        jobTitle:'',
        email:'',
        phone:'',
        userType: '',
        password:'',
        confirmPassword:'',
      })
    
      const handleChange = (event) =>{
        const input = event.target;
        const value = input.value;
        setUserInput({ 
            ...userInput,
            [input.name] : value,
        })
      }

    const handleCancel = (event) =>{
        props.history.push("/account/account");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(userInput.password == userInput.confirmPassword){
            const userSettings ={
                firstName:userInput.firstName,
                lastName:userInput.lastName,
                jobTitle:userInput.jobTitle,
                email:userInput.email,
                phone:userInput.companyZipCode,
                userType:userInput.userType,
                password:userInput.password,
                confirmPassword:userInput.confirmPassword,
            }
            axios.post("http://localhost:4000/app/account/account/new-user", userSettings)
            .then(response => console.log(response));
            alert('New user created successfully and added to the company!');
            props.history.push("/account/account"); 
            }
            else{
                alert("please match password and password confirmation.");
            }  
        }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h2>New User</h2>
                <Row>
                    <ColumnLeft>
                        <BlankImg src ={Default}></BlankImg>
                    </ColumnLeft>
                    <ColumnRight>
                        <FormLabel>First name</FormLabel>
                        <FullInput type="text" name="firstName" value={userInput.firstName}  onChange={handleChange} required></FullInput>
                        <FormLabel>Last name</FormLabel>
                        <FullInput type="text" name="lastName" value={userInput.lastName}  onChange={handleChange} required></FullInput>
                    </ColumnRight>
                </Row>          
                <FormLabel>Job title</FormLabel>
                <FullInput type="text" name="jobTitle" value={userInput.jobTitle}  onChange={handleChange}></FullInput>
                <FormLabel>Email</FormLabel>
                <FullInput type="email" name="email" value={userInput.email}  onChange={handleChange} required></FullInput>
                <FormLabel>Phone</FormLabel>
                <FullInput type="text" name="phone" value={userInput.phone}  onChange={handleChange}></FullInput>
                <FormLabel>User type</FormLabel>
                <FullInput type="text" name="userType" value={userInput.userType}  onChange={handleChange} required></FullInput>
                <Row>
                    <LeftColumn>
                        <FormLabel>Password</FormLabel>
                        <FullInput style={{width:"162%"}} type="password" name="password" pattern="(?=.*\d)(?=.*[A-Z])(?=.*[$+,:;=?@#|'<>.-^*()%!]).{8,8}" title="Password must match the restrictions!" value={userInput.password}  onChange={handleChange} required></FullInput>
                    </LeftColumn>
                    <RightColumn>
                        <FormLabel>Confirm password</FormLabel>
                        <FullInput style={{width:"167.5%"}} type="password" name="confirmPassword" pattern="(?=.*\d)(?=.*[A-Z])(?=.*[$+,:;=?@#|'<>.-^*()%!]).{8,8}" title="Password must match the restrictions!" value={userInput.confirmPassword}  onChange={handleChange} required></FullInput>
                    </RightColumn>
                </Row>
                <Cancel type="button" value="Cancel" onClick={handleCancel}></Cancel>
                <Create type="submit" value="Create"></Create>
            </Form>
        </div>
    )
}

export default NewUser
