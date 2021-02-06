import React, { useContext, useState } from "react"
import Card from "react-bootstrap/Card"
import UserContext from "./context/UserContext"
import { PencilSquare } from "react-bootstrap-icons"
import { XSquare } from "react-bootstrap-icons"
import { Button, Form } from "react-bootstrap"
import Axios from "axios";
import Alert from "react-bootstrap/Alert"
import { Link } from "react-router-dom"
import { Check2Square } from "react-bootstrap-icons"

function AllTodos({ todos }) {


	const [edit, setEdit] = useState(false)
	const [editTitle, setEditTitle] = useState()
	const [editText, setEditText] = useState()
	const [show, setShow] = useState({
		successText: "",
		errorText: "",
	})


	const { userData } = useContext(UserContext)

	
	const onDelete = async (id) => {
		await Axios.delete(`https://fullstack-todo-app-server.herokuapp.com/todos/${id}`)
			.then((response) => {
				setShow({ successText: response.data.msg })
			})
			.catch((err) => {
				setShow({ errorText: err.response.data.msg })
			})
	}

	const onEdit = async (id) => {
		let editTodo = {
			title: editTitle,
			text: editText,
		}

		await Axios.put(`https://fullstack-todo-app-server.herokuapp.com/todos/${id}`, editTodo)
			.then((response) => {
				setShow({ successText: response.data.msg })
				setEdit(!edit)
			})
			.catch((err) => {
				setShow({ errorText: err.response.data.msg })
			})
	}

	const sortedArray = todos.sort((a, b) => (a.userId > b.userId ? 1 : -1))
	return (
		<div className="all-todos">
		{show.successText ? (
				<Alert className="successmessage" show={show} variant="success">
					<Alert.Heading className="sucessheader">Success!</Alert.Heading>
					<p className="successtext">{show.successText}</p>
					<hr />
					<div
						style={{ flexDirection: "row" }}
						className="success-text-div d-flex  justify-content-end"
					>
						<Link className="success-text-login" to="/login">
							<Button
								onClick={() => setShow({ successText: "" })}
								variant="outline-success"
							>
								Go to Login Page
							</Button>
						</Link>
						<Button
							onClick={() => setShow({ successText: "" })}
							variant="outline-success"
						>
							Close
						</Button>
					</div>
				</Alert>
			) : (
				<></>
			)}
			{sortedArray.map((todo, key) => (
	

				<div className="todo-div" key={key}>
					<Card
						bg={userData.user.id == todo.userid ? "primary" : "success"}
						key={key}
						text="white"
						style={{ width: "18rem" }}
						className="mb-2"
					>
						<Card.Header>{todo.author}'s Todo List</Card.Header>
						<Card.Body>
							<Card.Title>Card Title </Card.Title>
							<Card.Text>
								<p>{todo.title}</p>
								{edit ? (
										<Form.Control
											type="text"
											onChange={(e) => setEditTitle(e.target.value)}
											placeholder="Enter the new title"
										/>
									) : null}
												
								<p>{todo.text}</p>
								{edit ? (
										<input
											type="text"
											onChange={(e) => setEditText(e.target.value)}
											placeholder="Enter the new text"
										/>
									) : null}
								
								<p>{todo.author}</p>
							</Card.Text>

							{ userData.user.id == todo.userid ?
							<>
							<button
									onClick={() => setEdit(!edit)}
									style={{ background: "transparent ", border: "none" }}
								>
									<PencilSquare fontSize="30px" color="white" />
								</button>
								

								
								<button
									onClick={() => onDelete(todo.id)}
									style={{ background: "transparent ", border: "none" }}
								>
									<XSquare fontSize="30px" color="white" />
								</button>
								</>
								:
								<></>
							}

								{edit && userData.user.id == todo.userid ? (
									<button
										onClick={() => onEdit(todo.id)}
										style={{ background: "transparent ", border: "none" }}
									>
										<Check2Square fontSize="30px" color="white" />
									</button>
								) : null}
							


						</Card.Body>
					</Card>
				</div>
			))}
		</div>
	)
}

export default AllTodos
