import React, { useState,useEffect } from 'react'
import {Submit, Input, DivForm, Other, Header, Label, CheckBoxStyle,Select,LogoImg} from '../Design/styledComponent'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import logo from '../../assets/Logo.png'
import '../Design/styles.css';



const ChooseCompany = () =>{
    document.body.style.backgroundColor = "#222e50";
    return (
        <>
            <DivForm>
                <LogoImg src ={logo} width="225" height="50"></LogoImg>
                <Header>Companies</Header>
                <Select>
                    <option>Company1</option>
                    <option>Company2</option>
                    <option>Company3</option>
                </Select>
               
                <Submit type="submit" value="Enter"></Submit>
            </DivForm>
        </>
    )
}

export default ChooseCompany
