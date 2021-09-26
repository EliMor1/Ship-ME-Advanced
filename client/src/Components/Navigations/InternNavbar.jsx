import React from 'react'
import {A, ListItem,UnorderedNavbar, Nav, navLinkStyleBlack,disablePage} from '../Design/styledComponent'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import '../Design/styles.css';
import {useSelector} from 'react-redux';

const InternNavbar = () =>{

    const userState = useSelector(state => state.user);
   
    return (
            <>
                <Nav>
                    <UnorderedNavbar>
                        <ListItem>                          
                            <A><Link style={navLinkStyleBlack} to = "/account/profile">Profile</Link></A>
                        </ListItem>
                        <ListItem>
                            <A><Link style={userState.isAdmin  ? disablePage : navLinkStyleBlack} to ="/account/company">Company</Link></A>
                        </ListItem>
                        <ListItem>                          
                            <A><Link style={navLinkStyleBlack} to = "/account/account">Account</Link></A>
                        </ListItem>
                        <ListItem>
                            <A><Link style={!userState.isAdmin  ? disablePage : navLinkStyleBlack} to ="/account/companies">Companies</Link></A>
                        </ListItem>
                    </UnorderedNavbar>
                </Nav>
            </>
    )
}

export default InternNavbar
