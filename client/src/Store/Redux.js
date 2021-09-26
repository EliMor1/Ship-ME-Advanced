import React from 'react'
import redux , {createStore} from 'redux';
import {createSlice, configureStore} from '@reduxjs/toolkit'

const initialUserState = {firstName:'', lastName:'', companyName:'', isAdmin:false, isManager:false};
const initialAuthState = {isLogged:false};

const userSlice = createSlice({
    name:'user',
    initialState:initialUserState,
    reducers:{
        adminApproved(state){
            state.isAdmin = true;
        },
        managerApproved(state){
            state.isManager = true;
        },
        updateProfile(state,action){
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
        updateCompany(state,action){
            state.companyName = action.payload.companyName;
        },
        clearStore(state){
            state.isAdmin = false;
            state.isManager = false;
            state.firstName = '';
            state.lastName = '';
            state.companyName = '';
            
        }
    }
})

const authSlice = createSlice({
    name:'authentication',
    initialState : initialAuthState,
    reducers:{
        userLogged(state){
            state.isLogged = true;
        }
    }
})

const store = configureStore({
    reducer:{
        user : userSlice.reducer , auth : authSlice.reducer
    }
});

export const userActions = userSlice.actions;
export const authActions = authSlice.actions;
export default store;

// ---------> an implementation of redux reducer without redux toolkit

/*const stateReducer = (state = initialState, action ) =>{
    if(action.type === 'manager-approved'){
        return{
            isManager:true
        }
    }
    if(action.type === 'admin-approved'){
        return {
            isAdmin:true,
        }
    }
    if(action.type === 'profile'){
        return {
            firstName:action.payload.firstName,
            lastName:action.payload.lastName
        };
    }
    if(action.type === 'company'){
        return {
            companyName:action.payload.companyName
        }
    }
    return state;
};*/

//const store = createStore(stateReducer);

// export default store;