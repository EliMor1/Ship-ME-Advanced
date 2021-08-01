import React from 'react'

const UserContext = React.createContext({
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    companyManaged:''

})

export default UserContext;