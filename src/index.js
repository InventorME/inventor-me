import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProfilePage from './navigationBanner/profilePage/ProfilePage';
import AccountsPage from './accountsPage/AccountsPage';
import SignInPage from './signinPage/SignInPage';
import HomePage from './homePage/HomePage';
import CreateAcctPage from './createacctPage/CreateAcctPage';

ReactDOM.render(
   <BrowserRouter>
   <Switch>
    <Route exact path="/" component={App}/>
    <Route path="/accounts-page" component={AccountsPage}/>
    <Route path="/profile-page" component={ProfilePage}/>
    <Route path= "/home-page" component = {HomePage}/>
    <Route path = "/signin-page" component = {SignInPage}/>
    <Route path = "/createacct-page" component = {CreateAcctPage}/>
  </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
