import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import UserPanel1 from './components/UserPanel1'
import UserPanel2 from './components/UserPanel2'
import UserPanel3 from './components/UserPanel3'
import NotesList from './components/NotesList'
import Home from './components/Home'
import Elemento from './components/Elemento'
import Create from './components/Create'
import CreateUser from './components/CreateUser'
//import Profile from './components/Profile'

import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      
      <div className="container p-4">
        <Route path="/" exact component={Home} />
        <Route path="/Home" exact component={Home} />

        <Route path="/userPanel1"  component={UserPanel1} />
        <Route path="/userPanel2"  component={UserPanel2} />
        <Route path="/userPanel3"  component={UserPanel3} />
        

        <Route path="/elemento/:id" exact component={Elemento} />
        <Route path="/edit/:id" exact component={Create} />
        <Route path="/create" exact component={Create} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
