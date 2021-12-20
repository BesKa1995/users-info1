import './App.css';
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Users from './Users/Users'
import {UsersInfo} from './AboutUser/UserInfo'

function App() {


	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<Users/>}/>
				<Route path='user/:id' element={<UsersInfo/>}/>
			</Routes>
		</div>
	);
}

export default App;
