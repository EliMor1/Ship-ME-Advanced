import React, { Component } from 'react'
import {VerticalSeparator, A, UnorderedList, ListItem, Logo, DropLabel,MinimizedImg,BellImg,DropImg} from '../Design/styledComponent'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import logo from '../../assets/LogoHome.png'
import dropIcon from '../../assets/Unknown.png'
import Default from '../../assets/Default.jpg'
import Bell from '../../assets/Bell.png';
import '../Design/styles.css';
import {useSelector, useDispatch} from 'react-redux';
import { userActions } from '../../Store/Redux.js';


const Navbar = (props) =>{

    const userState = useSelector(state => state.user);
    const authState = useSelector(state => state.auth);
   
   
   
    // const dispatch = useDispatch();
    //dispatch({type:'company'});

    //dispatch(userActions.adminApproved());
    //dispatch(userActions.updateProfile({firstName:'somename', lastName:'last'}));
    //dispatch(userActions.updateCompany(userInput.companyName)); -->> userInput is a json format const variable. userInput:{first... , last... , etc}
    
  
    const navLinkStyle = {
        display:"block",
        color: "white",
        textAlign: "center",
        padding: "16px 12px",
        textDecoration:"none",
        fontSize: "11px",
        fontWeight:"bold",
        fontFamily: "Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        
    }
    const LinkStyle = {
        display:"block",
        color: "black",
        textAlign: "left",
        textDecoration:"none",
        fontSize: "12px",
        fontFamily: "Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        
    }
    const disablePage ={
        display:"none"
    }

    return (
        <div>
            <div>
                <UnorderedList>
                    <ListItem>
                        <Logo src ={logo} width="130" height="25"></Logo>
                    </ListItem>
                    <ListItem>
                    <VerticalSeparator/>
                    </ListItem>
                    <ListItem>                          
                        <A><Link style={navLinkStyle} to = "/home/shipments">Shipments</Link></A>
                    </ListItem>
                    <ListItem>
                        <A><Link style={navLinkStyle} to ="/home/orders">Orders</Link></A>
                    </ListItem>
                    <ListItem>
                    <BellImg src ={Bell}></BellImg>
                    </ListItem>
                    <ListItem>
                    <div class="dropdown">
                        <img src={dropIcon} class="dropbtn"></img>
                            <div class="dropdown-content">
                            <br></br>
                            <DropImg src={Default}></DropImg>
                            <DropLabel>{userState.firstName} {userState.lastName}</DropLabel>
                            <br></br>
                            <DropLabel>{userState.companyName}</DropLabel>
                            <br></br>
                            <br></br>
                            <a> <Link style={LinkStyle} to ="/account/profile">Profile</Link></a>
                            <a> <Link style={userState.isAdmin ? disablePage : LinkStyle} to ="/account/company">Company</Link> </a>
                            <a> <Link style={LinkStyle} to = "/account/account">Account</Link></a>
                            
                            <a> <Link style={!userState.isAdmin ? disablePage :LinkStyle} to = "/account/companies">Companies</Link></a>
                            <hr></hr>
                            <a> <Link style={LinkStyle} to = "/">Logout</Link></a>
                            <br></br>
                        </div>
                    </div>
                </ListItem>
                <ListItem> 
                    <MinimizedImg src ="https://randomuser.me/api/portraits/men/43.jpg"></MinimizedImg>
                </ListItem>
                </UnorderedList>   
            </div>
        </div>
    )
}

export default Navbar
