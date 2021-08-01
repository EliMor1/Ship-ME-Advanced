import React, { useEffect,useState } from 'react'
import {Header,Form,ColumnLeft,ColumnRight,Row,FullInput,FormLabel,BlankImg,Save,LeftColumn,CenterColumn,RightColumn,Cancel,Create} from '../Design/styledComponent'
import axios from 'axios'
import defaultCompanyImg from '../../assets/company-default.png'
import '../Design/styles.css';

const NewCompany = (props) =>{

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
        props.history.push("/account/companies");
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
            token: localStorage.getItem('token')
        }
        axios.post("http://localhost:4000/app/newcomp", companySettings)
        .then(response => console.log(response));
        alert('New company created successfully!');
        props.history.push("/account/companies");   
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h2>New Company</h2>
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
                <FormLabel>Primary contact name</FormLabel>
                <FullInput type="text" name="primaryContactName" value={userInput.primaryContactName}  onChange={handleChange}></FullInput>
                <FormLabel>Primary contact phone</FormLabel>
                <FullInput type="text" name="primaryContactPhone" value={userInput.primaryContactPhone}  onChange={handleChange}></FullInput>
                <FormLabel>Primary contact job title</FormLabel>
                <FullInput type="text" name="primaryContactJobTitle" value={userInput.primaryContactJobTitle}  onChange={handleChange}></FullInput>
                <hr></hr>
                <Cancel type="button" value="Cancel" onClick={handleCancel}></Cancel>
                <Create type="submit" value="Create"></Create>
            </Form>
        </div>
    )
}

export default NewCompany
