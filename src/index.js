import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter } from 'react-router-dom'
import App from './App'
import Login from './Login'
import Dashboard from './Dashboard'

const routs = (
   < BrowserRouter >
      <div>
        
         <Route exact path="/" component={Login} />
         <Route exact path="/dashboard" component={Dashboard} />
      </div>
   </ BrowserRouter >
);
ReactDOM.render(routs, document.getElementById('root'))