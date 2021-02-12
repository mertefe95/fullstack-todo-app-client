import React, { useContext } from "react"
import { Navbar, Button, Form, FormControl, Nav } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"
import UserContext from "../context/UserContext"

function Header() {
	const { userData, setUserData } = useContext(UserContext)

	const handleData = async () => {
		await setUserData({
			token: null,
			user: {
				email: null,
				username: null,
				id: null,
			},
		})
		await localStorage.setItem("auth-token", "")
	}

	return (
		<Navbar bg="light" variant="light">
			<Navbar.Brand href="/">Todo App</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/">VIEW ALL TODOS</Nav.Link>
			{userData.user.id === null ? (
				<>
				</>
			) : (
				<Nav.Link href="/mytodos">VIEW ONLY MY TODOS</Nav.Link>
			)}	
			</Nav>
			<Form inline>
				{userData.user.id === null ? (
					<>
						<Nav.Link href="/register">REGISTER</Nav.Link>
						<Nav.Link href="/login">LOGIN</Nav.Link>
					</>
				) : (
					<>
						<Nav.Link href="/add-todo">ADD TODO</Nav.Link>
						<button
							style={{ background: "none", border: "none" }}
							onClick={() => handleData()}
						>
							<Nav.Link href="/">LOGOUT</Nav.Link>
						</button>
					</>
				)}
			</Form>
		</Navbar>
	)
}

export default Header
