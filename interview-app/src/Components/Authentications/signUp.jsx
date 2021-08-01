import React, { Component,useState } from 'react'
//import './styles.css';
import '../Design/styles.css';
import {Submit, Input, DivForm, Input2, Label2, Header, Label,LogoImg} from '../Design/styledComponent'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import logo from '../../assets/Logo.png'
// export class SignUp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstName:'',
//       lastName:'',
//       email : '',
//       password:'',
//       confirmPassword:''
  
//     };
//     this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
//     this.handleChangeLastName = this.handleChangeLastName.bind(this);
//     this.handleChangePassword = this.handleChangePassword.bind(this);
//     this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
//     this.handleChangeEmail = this.handleChangeEmail.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this)
//     document.body.style.backgroundColor = "#222e50";
//   }


//   handleChangeFirstName(event) {
//     this.setState({firstName: event.target.value});
//   }

//   handleChangeLastName(event) {
//     this.setState({lastName: event.target.value});
//   }

//   handleChangeEmail(event) {
//     this.setState({email: event.target.value});
//   }

//   handleChangePassword(event) {
//     this.setState({password: event.target.value});
//   }
//   handleChangeConfirmPassword(event) {
//     this.setState({confirmPassword: event.target.value});
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     if(this.state.password == this.state.confirmPassword){
//       const registeredUser ={
//         firstName:this.state.firstName,
//         lastName:this.state.lastName,
//         email:this.state.email,
//         password:this.state.password
//       }
//       axios.post("http://localhost:4000/app/auth/signup", registeredUser)
//       .then(response =>{ 
//         localStorage.setItem('token', response.data);
//         document.body.style.backgroundColor = "white";
//         this.props.history.push("/home");
//       });
//     }
//     else{
//       alert('Please match the password and confirm password fields in order to complete the Sign Up process.');
//     }
//   }

//   render() {
//     return (
//         <DivForm>
//           <LogoImg src ={logo} width="225" height="50"></LogoImg>
//           <Header>Sign up</Header>
//           <form onSubmit={this.handleSubmit}>
//             <span>
//                 <Label2 >First name</Label2>
//                 <Label2 >Last name</Label2>
//                 <br></br>
//                 <Input2 type="text" name="fName" onChange={this.handleChangeFirstName} autoFocus required ></Input2>
//                 <Input2 type="text" name="lName" onChange={this.handleChangeLastName} required></Input2>
//                 <br></br>
//             </span>
//             <br></br>
//             <Label for="emailBox">Email address </Label>
//             <Input id="emailBox" type="email" name="email"  title="Must be a valid email address." onChange={this.handleChangeEmail} required></Input>
//             <Label for="passwordBox">Password </Label>
//             <Input id="passwordBox" type="password" name="pass" pattern="(?=.*\d)(?=.*[A-Z])(?=.*[$+,:;=?@#|'<>.-^*()%!]).{8,8}" title="Password must match the restrictions!" onChange={this.handleChangePassword} required></Input>
//             <Label for="confirmPasswordBox">Confirm password </Label>
//             <Input id="confirmPasswordBox" type="password" name="confirmPass" pattern="(?=.*\d)(?=.*[A-Z])(?=.*[$+,:;=?@#|'<>.-^*()%!]).{8,8}" title="Password must match the restrictions!" onChange={this.handleChangeConfirmPassword} required></Input>
//             <Submit type="submit" value="Sign Up"></Submit>
//             <div style ={{height:"50px"}}>
//               <Link to="/">Already a User?</Link>
//             </div>
//           </form>
//         </DivForm>
//     );
    
//   }
// }

const SignUp = (props) =>{
  document.body.style.backgroundColor = "#222e50";
  const [userInput,setUserInput] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
  })

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
    if(userInput.password == userInput.confirmPassword){
      const registeredUser ={
        firstName:userInput.firstName,
        lastName:userInput.lastName,
        email:userInput.email,
        password:userInput.password
      }
      axios.post("http://localhost:4000/app/auth/signup", registeredUser)
      .then(response =>{ 
        localStorage.setItem('token', response.data);
        document.body.style.backgroundColor = "white";
        props.history.push("/home");
      });
    }
    else{
      alert('Please match the password and confirm password fields in order to complete the Sign Up process.');
    }
  }

  return (
    <DivForm>
      <LogoImg src ={logo} width="225" height="50"></LogoImg>
      <Header>Sign up</Header>
      <form onSubmit={handleSubmit}>
        <span>
            <Label2 >First name</Label2>
            <Label2 >Last name</Label2>
            <br></br>
            <Input2 type="text" name="firstName" onChange={handleChange} autoFocus required ></Input2>
            <Input2 type="text" name="lastName" onChange={handleChange} required></Input2>
            <br></br>
        </span>
        <br></br>
        <Label for="emailBox">Email address </Label>
        <Input id="emailBox" type="email" name="email"  title="Must be a valid email address." onChange={handleChange} required></Input>
        <Label for="passwordBox">Password </Label>
        <Input id="passwordBox" type="password" name="password" pattern="(?=.*\d)(?=.*[A-Z])(?=.*[$+,:;=?@#|'<>.-^*()%!]).{8,8}" title="Password must match the restrictions!" onChange={handleChange} required></Input>
        <Label for="confirmPasswordBox">Confirm password </Label>
        <Input id="confirmPasswordBox" type="password" name="confirmPassword" pattern="(?=.*\d)(?=.*[A-Z])(?=.*[$+,:;=?@#|'<>.-^*()%!]).{8,8}" title="Password must match the restrictions!" onChange={handleChange} required></Input>
        <Submit type="submit" value="Sign Up"></Submit>
        <div style ={{height:"50px"}}>
          <Link to="/">Already a User?</Link>
        </div>
      </form>
    </DivForm>
  );
}

export default SignUp