import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import AllTodos from './components/AllTodos'
import React, { useState, useEffect } from 'react'
import UserContext from './components/context/UserContext'
import Axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from './components/Register'
import Login from './components/Login'
import AddTodo from './components/AddTodo'
import MyTodos from './components/MyTodos'

import './App.css'

function App() {
	const [todos, setTodos] = useState([])

	const [userData, setUserData] = useState({
		token: null,
		user: {
			id: null,
			email: null,
			username: null,
		},
	})

	useEffect(() => {
		const checkLoggedIn = async () => {
			let token = localStorage.getItem('auth-token')
			if (token === null) {
				localStorage.setItem('auth-token', '')
				token = ''
			}

			const userRes = await Axios({
				method: 'post',
				url: 'http://localhost:8080/users/tokenIsValid',
				data: {},
				headers: {
					'x-auth-token': token,
				},
			})

			setUserData({
				token: token,
				user: userRes.data,
			})
		}

		checkLoggedIn()
	}, [])

	useEffect(() => {
		Axios.get('http://localhost:8080/todos')
			.then((res) => setTodos(res.data))
			.catch((error) => console.log(error))
	})

	return (
		<Router>
			<UserContext.Provider value={{ userData, setUserData }}>
				<Header />
				<Switch>
					<Route exact path='/' render={() => <AllTodos todos={todos} />} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/add-todo' component={AddTodo} />
					<Route
						exact
						path='/mytodos'
						render={() => <MyTodos todos={todos} />}
					/>
				</Switch>
				<Footer />
			</UserContext.Provider>
		</Router>
	)
}

export default App
