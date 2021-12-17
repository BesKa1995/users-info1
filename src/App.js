import './App.css';
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Users from './Users/Users'
import AboutUser from './AboutUser/AboutUser'

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Users/>}/>
        <Route path='aboutUser/:id' element={<AboutUser/>}/>
      </Routes>
    </div>
  );
}

export default App;
