import React, { Component,useState } from 'react'
//import './styles.css';
import '../Design/styles.css';
import {LoginForm,Root,Submit, Input, DivForm, Other, Header, Label, CheckBoxStyle,LogoImg} from '../Design/styledComponent'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import logo from '../../assets/Logo.png'


const Login = (props) =>{
  document.body.style.backgroundColor = "#222e50";
  localStorage.removeItem('token');
  const [userInput,setUserInput] = useState({
    email:0,
    password:0,
    rememberMe: false,
    accessToken:'',
    logged:true
  })

  const handleChange = (event) =>{
    const input = event.target;
    const value = input.value;
    setUserInput({ 
        ...userInput,
        [input.name] : value,
    })
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    const loggedUser = {
      email:userInput.email,
      password:userInput.password,
    }
    axios.post("http://localhost:4000/app/auth/login", loggedUser)
    .then(response =>{
       if(response.data != 'invalid password.' && response.data != 'invalid email address.'){
        localStorage.setItem('token', response.data);
        document.cookie = `token=${response.data}`
        document.headers = `token=${response.data}`
        document.body.style.backgroundColor = "white";
        props.history.push("/home");
       }
       else{
          props.history.push("/");
          alert('one or more of the inserted data is incorrect!');
       }
      })
  }

  return (
    <DivForm>
      <LogoImg src ={logo} width="225" height="50"></LogoImg>
      <Header>Sign in</Header>
      <form onSubmit={handleSubmit}>
        <Label for="emailBox">Email address </Label>
        <Input id="emailBox" type="email" name="email"  title="Must be a valid email address." onChange={handleChange} autoFocus required></Input>
        <Label for="passwordBox">Password</Label>
        <Input id="passwordBox" type="password" name="password" onChange={handleChange} required></Input>
        <Submit type="submit" value="Log In"></Submit>
        <CheckBoxStyle type="checkbox" name="rememberMe"  ></CheckBoxStyle>
        <Other>Remember me</Other>
        <br></br>
        <div style ={{height:"50px"}}>
          <Link to ="/sign-up">Create Account</Link>
        </div>
      </form>
    </DivForm>
  );
}

export default Login
