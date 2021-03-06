import React, { useState,useEffect } from 'react'
import {Form,ColumnLeft,ColumnRight,Row,FullInput,FormLabel,BlankImg,HorizontalSeparator,Save,LeftColumn,CenterColumn,RightColumn} from '../Design/styledComponent'
import axios from 'axios'
import defaultCompanyImg from '../../assets/company-default.png'
import '../Design/styles.css';
import { useDispatch} from 'react-redux';
import { userActions } from '../../Store/Redux.js';




const Company = (props) =>{

    const dispatch = useDispatch();

    const [userInput,setUserInput] = useState({
        companyName:'',
        companyAddress:'',
        companyCity:'',
        companyState:'',
        companyZipCode:'',
        companyPhone: '',
        companyEmail:'',
        companyWebsite:'',
        primaryContactName:'',
        primaryContactPhone:'',
        primaryContactJobTitle:'',
        userType:false
    })
    
    const handleUpdate = (response) =>{
        setUserInput({
            ...userInput,
            companyName:response.data.companyName,
            companyAddress:response.data.companyAddress,
            companyCity:response.data.city,
            companyState:response.data.state,
            companyZipCode:response.data.zipCode,
            companyPhone:response.data.companyPhone,
            companyEmail:response.data.companyEmail,
            companyWebsite:response.data.companyWebsite,
            primaryContactName:response.data.primaryContactName,
            primaryContactPhone:response.data.primaryContactPhone,
            primaryContactJobTitle:response.data.primaryContactJobTitle,
                
        });
    }

    const handleChange = (event) =>{
        const input = event.target;
        const value = input.value;
        setUserInput({ 
            ...userInput,
            [input.name] : value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const companySettings ={
            companyName:userInput.companyName,
            companyAddress:userInput.companyAddress,
            companyCity:userInput.companyCity,
            companyState:userInput.companyState,
            companyZipCode:userInput.companyZipCode,
            companyPhone:userInput.companyPhone,
            companyEmail:userInput.companyEmail,
            companyWebsite:userInput.companyWebsite,
            primaryContactName:userInput.primaryContactName,
            primaryContactPhone:userInput.primaryContactPhone,
            primaryContactJobTitle:userInput.primaryContactJobTitle,
            
        }
        axios.patch("http://localhost:4000/app/account/company/update", companySettings, {headers: {Authorization : localStorage.getItem('token')}})
        .then(response => console.log(response));
        if(userInput.companyName != undefined){
            dispatch(userActions.updateCompany({companyName : userInput.companyName}));
        }
    }

    useEffect(() =>{
        if(!localStorage.getItem('token')){
            axios.get("http://localhost:4000/app/auth/validate").then(response => console.log(response));
            document.body.style.backgroundColor = "white";
            props.history.push("/unauthorized");
            
        }
        axios.get("http://localhost:4000/app/account/company", {headers: {Authorization : localStorage.getItem('token')}}).then(response => handleUpdate(response));
    },[localStorage.getItem('token')]);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>Company info</h2>
                <Row>
                    <ColumnLeft>
                        <BlankImg src ={defaultCompanyImg}></BlankImg>
                    </ColumnLeft>
                    <ColumnRight>
                        <FormLabel>Company name</FormLabel>
                        <FullInput type="text" name="companyName" value={userInput.companyName}  onChange={handleChange}></FullInput>
                        <FormLabel>Company Address</FormLabel>
                        <FullInput type="text" name="companyAddress" value={userInput.companyAddress}  onChange={handleChange}></FullInput>
                    </ColumnRight>
                </Row> 
                <Row>
                    <LeftColumn>
                        <FormLabel>City</FormLabel>
                        <FullInput type="text" name="companyCity" value={userInput.companyCity}  onChange={handleChange}></FullInput>
                    </LeftColumn>
                    <CenterColumn>
                        <FormLabel>State</FormLabel>
                        <FullInput type="text" name="companyState" value={userInput.companyState}  onChange={handleChange}></FullInput>
                    </CenterColumn>
                    <RightColumn>
                        <FormLabel>Zip code</FormLabel>
                        <FullInput type="text" name="companyZipCode" value={userInput.companyZipCode}  onChange={handleChange}></FullInput>
                    </RightColumn>
                </Row>
                <FormLabel>Company phone</FormLabel>
                <FullInput type="text" name="companyPhone" value={userInput.companyPhone}  onChange={handleChange}></FullInput>
                <FormLabel>Company email</FormLabel>
                <FullInput type="email" name="companyEmail" value={userInput.companyEmail}  onChange={handleChange}></FullInput>
                <FormLabel>Company website</FormLabel>
                <FullInput type="text" name="companyWebsite" value={userInput.companyWebsite}  onChange={handleChange}></FullInput>
                <hr></hr>
                <FormLabel>Primary contact name</FormLabel>
                <FullInput type="text" name="primaryContactName" value={userInput.primaryContactName}  onChange={handleChange}></FullInput>
                <FormLabel>Primary contact phone</FormLabel>
                <FullInput type="text" name="primaryContactPhone" value={userInput.primaryContactPhone}  onChange={handleChange}></FullInput>
                <FormLabel>Primary contact job title</FormLabel>
                <FullInput type="text" name="primaryContactJobTitle" value={userInput.primaryContactJobTitle}  onChange={handleChange}></FullInput>
                <hr></hr>
                <br></br>
                <Save type="submit" value="Save"></Save>
            </Form>
        </>
    )
}

export default Company
