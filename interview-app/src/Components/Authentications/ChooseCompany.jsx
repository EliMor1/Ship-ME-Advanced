import React, { useState,useEffect } from 'react'
import {Submit, Input, DivForm, Other, Header, Label, CheckBoxStyle,Select} from '../Design/styledComponent'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import logo from '../../assets/Logo.png'
import '../Design/styles.css';



const ChooseCompany = () =>{
    document.body.style.backgroundColor = "#222e50";
    return (
        <div>
            <DivForm>
                <br></br>
                <br></br>
                <br></br>
                <img src ={logo} width="225" height="50"></img>
                <h2>Companies</h2>
                <br></br>
                <br></br>
                <Select>
                    <option>Company1</option>
                    <option>Company2</option>
                    <option>Company3</option>
                </Select>
                <br></br>
                <br></br>
                <br></br>
                <Submit type="submit" value="Enter"></Submit>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </DivForm>
        </div>
    )
}

export default ChooseCompany
