import React from 'react'
import {Submit, DivForm, Header,Select,LogoImg} from '../Design/styledComponent'
import logo from '../../assets/Logo.png'
import '../Design/styles.css';


 // this component is not yet implemented. 
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
