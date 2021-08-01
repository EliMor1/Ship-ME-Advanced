import React, { Component } from 'react'
import {A, UnorderedList, ListItem,UnorderedNavbar, Nav} from '../Design/styledComponent'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import '../Design/styles.css';
import {useSelector, useDispatch} from 'react-redux';
import { userActions } from '../../Store/Redux.js';

const InternNavbar = () =>{

    const userState = useSelector(state => state.user);
    const authState = useSelector(state => state.auth);
    
    const disablePage ={
        display:"none"
    }
    const navLinkStyle = {
        display:"block",
        color: "black",
        textAlign: "center",
        padding: "16px 12px",
        textDecoration:"none",
        fontSize: "11px",
        fontFamily: "Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        
    }
    return (
            <>
                <Nav>
                    <UnorderedNavbar>
                        <ListItem>                          
                            <A><Link style={navLinkStyle} to = "/account/profile">Profile</Link></A>
                        </ListItem>
                        <ListItem>
                            <A><Link style={userState.isAdmin  ? disablePage : navLinkStyle} to ="/account/company">Company</Link></A>
                        </ListItem>
                        <ListItem>                          
                            <A><Link style={navLinkStyle} to = "/account/account">Account</Link></A>
                        </ListItem>
                        <ListItem>
                            <A><Link style={!userState.isAdmin  ? disablePage : navLinkStyle} to ="/account/companies">Companies</Link></A>
                        </ListItem>
                    </UnorderedNavbar>
                </Nav>
            </>
    )
}

export default InternNavbar
