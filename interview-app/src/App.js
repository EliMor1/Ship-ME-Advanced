import logo from './logo.svg';
import './App.css';
import Login from './Components/Authentications/login'
import SignUp from './Components/Authentications/signUp'
import Home from './Components/Account/Home'
import {BrowserRouter as Router, Switch, Route, Link , Redirect} from 'react-router-dom';
import Profile from './Components/Account/Profile';
import Company from './Components/Account/Company';
import Account from './Components/Account/Account';
import Companies from './Components/Account/Companies';
import ChooseCompany from './Components/Authentications/ChooseCompany';
import NewCompany from './Components/Account/NewCompany';
import NewUser from './Components/Account/NewUser';
import UnauthorizedPage from './Components/Unauthorization/UnauthorizedPage';
import Navbar from './Components/Navigations/Navbar';
import InternNavbar from './Components/Navigations/InternNavbar';

function App() {
  return (
    <main>
      
      <Switch>
          <Route path ="/" component ={Login} exact />
          <Route path ='/sign-up' component = {SignUp} />  
          <Route path ="/choose-company" component = {ChooseCompany}/>
          <Route path ="/account/new-company" component = {NewCompany}/>
          <Route path ="/account/new-user" component = {NewUser}/>
          <Route path = '/unauthorized' component = {UnauthorizedPage}/>
          <Route>
            <Navbar/>
            <Route path ="/home" component={Home} />
              <Route>
              <InternNavbar/>    
              <Route path ="/account/profile" component = {Profile}/>
              <Route path ="/account/company" component = {Company}/>
              <Route path ="/account/account" component = {Account}/>
              <Route path ="/account/companies" component = {Companies}/>
            </Route>
          </Route>
      </Switch>
   
    </main>
  );
}

export default App;
