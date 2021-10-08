import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png'
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Landing from './Landing';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth , onAuthStateChanged } from "firebase/auth";
import firebaseConfig from './config';
function App() {
  const [user,setUser]=useState({});
  const app=initializeApp(firebaseConfig);
  const auth = getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user!=={})
      {
        setUser(user);
      }
      else
      {
        setUser({});
      }
    })
  },[])
  return (
    <BrowserRouter>
    <div className="App">
    {user!==null?
    <Switch>
    <Route path='/' >
    <Landing user={user}/>
    </Route>
    <Redirect to="/" />
    </Switch>
    :
    <Switch>
    <Route exact path="/signup" >
    <Signup/>
    </Route>        
    <Route path='/'>
    <Login/>
    </Route>
    <Redirect to="/" />
    </Switch>
    }
    </div>
    </BrowserRouter>
  );
}

export default App;
