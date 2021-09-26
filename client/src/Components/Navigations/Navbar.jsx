import React from 'react'
import {VerticalSeparator, A, UnorderedList, ListItem,ListItemRight, Logo, DropLabel,MinimizedImg,BellImg,DropImg, navLinkStyleWhite,LinkStyle,disablePage} from '../Design/styledComponent'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import logo from '../../assets/LogoHome.png'
import dropIcon from '../../assets/Unknown.png'
import Default from '../../assets/Default.jpg'
import Bell from '../../assets/Bell.png';
import '../Design/styles.css';
import {useSelector} from 'react-redux';


const Navbar = () =>{

    const userState = useSelector(state => state.user);

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
                        <A><Link style={navLinkStyleWhite} to = "/home/shipments">Shipments</Link></A>
                    </ListItem>
                    <ListItem>
                        <A><Link style={navLinkStyleWhite} to ="/home/orders">Orders</Link></A>
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
                            <a> <Link style={LinkStyle} to ="/account/profile">Profile</Link></a>
                            <a> <Link style={userState.isAdmin ? disablePage : LinkStyle} to ="/account/company">Company</Link> </a>
                            <a> <Link style={LinkStyle} to = "/account/account">Account</Link></a>
                            <a> <Link style={!userState.isAdmin ? disablePage :LinkStyle} to = "/account/companies">Companies</Link></a>
                            <hr></hr>
                            <a> <Link style={LinkStyle} to = "/">Logout</Link></a>    
                        </div>
                    </div>
                </ListItem>
                <ListItemRight> 
                    <MinimizedImg src ={Default}></MinimizedImg>
                </ListItemRight>
                </UnorderedList>   
            </div>
        </div>
    )
}

export default Navbar
